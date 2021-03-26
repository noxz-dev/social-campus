import { createWriteStream, unlink } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import _ from 'lodash';
import os from 'os';
import path from 'path';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getRepository, In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from '../entity/comment.entity';
import { Group } from '../entity/group.entity';
import { Like } from '../entity/like.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { log } from '../utils/services/logger';
import { minioClient } from '../utils/services/minio';
import { SUB_TOPICS } from './notification.resolver';

export interface newPostPayload {
  post?: Post;
}
@Resolver(() => Post)
export class PostResolver {
  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPosts returns all posts from a given userID',
  })
  public async getPostsFromUser(@Ctx() ctx: MyContext, @Arg('userID') userID: string): Promise<Post[] | null> {
    const userId = ctx.req.user.id;
    if (!userId) return null;

    const posts = await getRepository(Post).find({
      relations: [
        'comments',
        'user',
        'likes',
        'likes.user',
        'user.followers',
        'user.following',
        'comments.user',
        'comments.likes',
        'comments.likes.user',
      ],
      where: { user: { id: userID } },
      order: { createdAt: 'DESC' },
    });
    if (!posts) {
      return null;
    }

    for await (const post of posts) {
      const likeState = await checkLikeState(userId, post.id);
      post.liked = likeState;
    }

    return posts;
  }

  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPosts returns all posts from a given groupID',
  })
  public async getPostsFromGroup(@Ctx() ctx: MyContext, @Arg('groupID') groupID: string): Promise<Post[] | null> {
    const userId = ctx.req.user.id;
    if (!userId) return null;
    const posts = await getRepository(Post).find({
      relations: [
        'comments',
        'user',
        'likes',
        'likes.user',
        'user.followers',
        'user.following',
        'comments.user',
        'comments.likes',
        'comments.likes.user',
      ],
      where: { group: { id: groupID } },
      order: { createdAt: 'DESC' },
    });
    if (!posts) {
      return null;
    }

    for await (const post of posts) {
      const likeState = await checkLikeState(userId, post.id);
      post.liked = likeState;
    }

    return posts;
  }

  @Authorized()
  @Query(() => [Post])
  public async getFeed(@Ctx() ctx: MyContext): Promise<Post[] | null> {
    const userID = ctx.req.user.id;

    const user = await getRepository(User).findOne({
      where: { id: userID },
      relations: ['following'],
    });

    const following = user.following.map((user: User) => user.id);

    // push own user id to see also your own posts
    following.push(userID);

    //fetch all posts from the users you follow
    const posts = await getRepository(Post).find({
      where: { user: In(following) },
      order: { createdAt: 'DESC' },
      relations: ['user', 'comments'],
    });

    if (!posts) return null;

    for await (const post of posts) {
      const likeState = await checkLikeState(userID, post.id);
      post.liked = likeState;
    }

    return posts;
  }

  @Authorized()
  @Query(() => Post)
  public async postById(@Ctx() ctx: MyContext, @Arg('postId') postId: string): Promise<Post | null> {
    const userID = ctx.req.user.id;

    const post = await getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id: postId })
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comments')
      .orderBy({
        'comments.createdAt': 'DESC',
      })
      .leftJoinAndSelect('comments.user', 'user.comments')
      .getOne();

    if (!post) return null;

    const likeState = await checkLikeState(userID, post.id);
    post.liked = likeState;

    return post;
  }

  @Authorized()
  @Mutation(() => Post)
  public async addPost(
    @Ctx() ctx: MyContext,
    @Arg('text') text: string,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file: FileUpload,
    @Arg('groupID', { nullable: true }) groupID: string,
  ): Promise<Post | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({
      relations: ['posts', 'posts.comments', 'posts.user', 'posts.group', 'posts.likes', 'posts.likes.user'],
      where: { id: ctx.req.user.id },
    });
    if (!user) {
      return null;
    }

    let group;
    if (groupID) {
      group = getRepository(Group).findOne({ where: { id: groupID } });
    }

    const post = new Post();
    post.text = text;
    post.user = user;
    post.likes = [];
    post.group = group;
    user.posts.push(post);

    if (file) {
      const metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        example: 5678,
      };
      const filenameUUID = uuidv4();
      const { createReadStream, filename } = await file;

      const fileEnding = filename.split('.')[1];
      const newFileName = filenameUUID + '.' + fileEnding;
      const destinationPath = path.join(os.tmpdir(), filename);
      await new Promise((res, rej) =>
        createReadStream()
          .pipe(createWriteStream(destinationPath))
          .on('error', rej)
          .on('finish', () => {
            minioClient.fPutObject('post-images', newFileName, destinationPath, metaData, (err, etag) => {
              if (err) {
                log.error(err.stack);
                throw Error('image upload failed');
              }
              log.info('File uploaded successfully.');

              //Delete the tmp file uploaded
              unlink(destinationPath, () => {
                res('file upload complete');
              });
            });
          }),
      );
      post.imageName = newFileName;
    }
    if (groupID && !group) {
      return null;
    }

    const dbPost = await getRepository(Post).save(post);
    await getRepository(User).save(user);

    dbPost.likesCount = 0;
    dbPost.commentCount = 0;
    dbPost.liked = false;

    await ctx.req.pubsub.publish(SUB_TOPICS.NEW_POST, { post: dbPost, userId: id });
    log.info(`'User with the id: ${id} added a new post'`);
    return dbPost;
  }

  @Subscription(() => Post, {
    topics: SUB_TOPICS.NEW_POST,
    filter: async ({ payload, args }) => {
      const user = await getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: ['followers'],
      });
      const ids = user.followers.map((u) => u.id);
      return args.userId, ids.includes(args.userId);
    },
  })
  public async newPost(
    @Ctx() ctx: MyContext,
    @Root() payload: newPostPayload,
    @Arg('userId') userId: string,
  ): Promise<Post> {
    return payload.post;
  }

  @Authorized()
  @Mutation(() => Post)
  public async likePost(@Ctx() ctx: MyContext, @Arg('postID') postID: string): Promise<Post | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    const post = await getRepository(Post).findOne({
      relations: ['comments', 'user', 'likes', 'likes.user', 'comments.user', 'comments.likes', 'comments.likes.user'],
      where: { id: postID },
    });
    if (!post) {
      return null;
    }
    for (const like of post.likes) {
      if (userId === like.user.id) throw new Error('you already liked this post');
    }

    const like = new Like();
    like.user = user;

    post.likes.push(like);
    await getRepository(Like).save(like);
    await getRepository(Post).save(post);

    const likeState = await checkLikeState(userId, post.id);
    post.liked = likeState;
    log.info(`user with the id ${userId} liked the post ${postID}`);
    return post;
  }

  @Authorized()
  @Mutation(() => Post)
  public async unlikePost(@Ctx() ctx: MyContext, @Arg('postID') postID: string): Promise<Post | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const post = await getRepository(Post).findOne({
      relations: [
        'comments',
        'user',
        'likes',
        'likes.user',
        'likes.post',
        'comments.user',
        'comments.likes',
        'comments.likes.user',
      ],
      where: { id: postID },
    });
    if (!post) {
      return null;
    }
    let like;
    _.remove(post.likes, (currentObject) => {
      if (currentObject.post.id === postID) {
        like = currentObject;
        return true;
      }
      return false;
    });

    if (like) {
      await getRepository(Like).remove(like);
    }

    await getRepository(Post).save(post);

    const likeState = await checkLikeState(userId, post.id);
    post.liked = likeState;
    log.info(`user with the id ${userId} unliked the post ${postID}`);
    return post;
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deletePost(@Ctx() ctx: MyContext, @Arg('postId') postId: string): Promise<boolean | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }
    const post = await getRepository(Post).findOne({ where: { id: postId }, relations: ['user'] });
    if (!post) return null;
    if (post.user.id === userId) {
      delete post.likesCount;
      await getRepository(Post).delete(post);
      log.info(`user with the id ${userId} deleted the post ${postId}`);
      return true;
    }
    throw Error('youre not allowed to do that');
  }
}

const checkLikeState = async (userId: string, postId: string): Promise<boolean> => {
  const result = await getRepository(Like).findOne({ where: { user: userId, post: postId } });
  if (result) return true;
  return false;
};

export const countLikes = async (postId: string): Promise<number> => {
  const { count } = await getRepository(Like)
    .createQueryBuilder('like')
    .where('like.post = :id', { id: postId })
    .select('COUNT(*)', 'count')
    .getRawOne();

  return count;
};

export const countComments = async (postId: string): Promise<number> => {
  const { count } = await getRepository(Comment)
    .createQueryBuilder('comment')
    .where('comment.post = :id', { id: postId })
    .select('COUNT(*)', 'count')
    .getRawOne();

  return count;
};
