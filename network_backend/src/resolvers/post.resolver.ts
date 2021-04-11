import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getManager, getRepository, In } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Group } from '../entity/group.entity';
import { Like } from '../entity/like.entity';
import { Post } from '../entity/post.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { uploadFileGraphql } from '../utils/helpers/fileUpload';
import { MyContext } from '../utils/interfaces/context.interface';
import { log } from '../utils/services/logger';
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
  public async getPostsFromUser(
    @Ctx() ctx: MyContext,
    @Arg('userID') userID: string,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
  ): Promise<Post[] | null> {
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
      take: take,
      skip: skip,
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
    description: 'all posts with filter options',
  })
  public async browsePosts(
    @Ctx() ctx: MyContext,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
    @Arg('tags', () => [String], { nullable: true }) tags: string[],
  ): Promise<Post[]> {
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('no user found');
    let posts: Post[];
    if (tags && tags.length > 0) {
      posts = await getRepository(Post)
        .createQueryBuilder('posts')
        .where('posts.group = :group', { group: null })
        .leftJoinAndSelect('posts.user', 'user')
        .leftJoinAndSelect('posts.tags', 'tags')
        .where('lower(tags.name) IN (:...tags)', { tags: tags.map((t) => t.toLowerCase()) })
        .orderBy('posts.createdAt', 'DESC')
        .skip(skip)
        .take(take)
        .getMany();
    } else {
      posts = await getRepository(Post).find({
        where: {
          group: null,
        },
        order: {
          createdAt: 'DESC',
        },
        relations: ['user', 'tags'],
        skip: skip,
        take: take,
      });
    }

    if (!posts) {
      return [];
    }

    //add all tags to the post.. its need based on the restriction of left join
    for await (const post of posts) {
      const tagsFromPost = await getRepository(Tag)
        .createQueryBuilder('tags')
        .leftJoin('tags.posts', 'post')
        .where('post.id = :id', { id: post.id })
        .getMany();

      post.tags = tagsFromPost;
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
  public async getPostsFromGroup(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<Post[] | null> {
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
      where: { group: { id: groupId } },
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
  public async getFeed(
    @Ctx() ctx: MyContext,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
  ): Promise<Post[] | null> {
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
      skip,
      take,
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
    @Arg('tags', () => [String], { nullable: true }) tags: string[],
  ): Promise<Post> {
    const id = ctx.req.user.id;
    if (!id) {
      throw new Error('not authenticated');
    }

    const user = await getRepository(User).findOne({
      relations: ['posts', 'posts.comments', 'posts.user', 'posts.group', 'posts.likes', 'posts.likes.user'],
      where: { id: ctx.req.user.id },
    });
    if (!user) {
      throw new Error('no user found');
    }

    let group;
    if (groupID) {
      group = await getRepository(Group).findOne({ where: { id: groupID } });
    }
    console.log(group);
    console.log(groupID);
    const post = new Post();
    post.text = text;
    post.user = user;
    post.likes = [];
    post.tags = [];
    post.group = group;
    user.posts.push(post);

    if (tags) {
      const tagsFromDB = await getRepository(Tag).find({
        where: {
          name: In(tags),
        },
      });
      const tagNamesFromDb = tagsFromDB.map((tag) => tag.name);
      for await (const name of tags) {
        let newTag;
        if (!tagNamesFromDb.includes(name)) {
          newTag = new Tag({ name: name, createdBy: user });
          newTag.posts = [];
        } else {
          newTag = await getRepository(Tag).findOne({
            where: {
              name: name,
            },
            relations: ['posts'],
          });
        }

        const dbTag = await getRepository(Tag).save(newTag);
        post.tags.push(dbTag);
      }
    }
    if (file) {
      const newFileName = await uploadFileGraphql(file, 'post-images');
      post.imageName = newFileName;
    }
    if (groupID && !group) {
      throw new Error('group does not exist');
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
      if (args.all) return true;
      const user = await getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: ['followers'],
      });
      //add user to auto update also the same user screen
      user.followers.push(user);
      const ids = user.followers.map((u) => u.id);
      return ids.includes(args.userId);
    },
  })
  public async newPost(
    @Ctx() ctx: MyContext,
    @Root() payload: newPostPayload,
    @Arg('userId') userId: string,
    @Arg('all') all: boolean,
  ): Promise<Post> {
    console.log('fired');
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
    post.likesCount = await countLikes(post.id);
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

    post.likes = post.likes.filter((like) => like.user.id !== userId);
    const like = await getRepository(Like).findOne({ where: { post: postID, user: userId } });
    await getRepository(Like).delete(like);
    await getRepository(Post).save(post);

    const likeState = await checkLikeState(userId, post.id);
    post.liked = likeState;
    log.info(`user with the id ${userId} unliked the post ${postID}`);
    post.likesCount = await countLikes(post.id);
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
      delete post.commentCount;
      await getRepository(Post).delete(post);
      log.info(`user with the id ${userId} deleted the post ${postId}`);
      return true;
    }
    throw Error('youre not allowed to do that');
  }

  @Authorized()
  @Mutation(() => Post)
  public async editPost(
    @Ctx() ctx: MyContext,
    @Arg('postId') postId: string,
    @Arg('text') text: string,
  ): Promise<Post> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const user = await getRepository(User).findOne({
      where: {
        id: userId,
      },
    });
    const post = await getRepository(Post).findOne({ where: { id: postId }, relations: ['user', 'tags'] });
    if (!post) return null;
    if (post.user.id === userId) {
      delete post.likesCount;
      delete post.commentCount;
      post.text = text;
      post.edited = true;
      const savedPost = await getManager().transaction(async (transactionManager) => {
        const foundTagNames = extractTags(text);
        post.tags = [];

        const tagsFromDB = await getRepository(Tag).find({
          where: {
            name: In(foundTagNames),
          },
        });
        const tagNamesFromDb = tagsFromDB.map((tag) => tag.name);

        for await (const name of foundTagNames) {
          let newTag;
          if (!tagNamesFromDb.includes(name)) {
            newTag = new Tag({ name: name, createdBy: user });
            newTag.posts = [];
          } else {
            newTag = await getRepository(Tag).findOne({
              where: {
                name: name,
              },
              relations: ['posts'],
            });
          }

          const dbTag = await getRepository(Tag).save(newTag);

          post.tags.push(dbTag);
        }

        const savedPost = await transactionManager.save(Post, post);
        log.info(`user with the id ${userId} edited the post ${postId}`);
        return savedPost;
      });
      savedPost.liked = await checkLikeState(userId, postId);
      savedPost.likesCount = await countLikes(postId);
      savedPost.commentCount = await countComments(postId);
      await ctx.req.pubsub.publish(SUB_TOPICS.NEW_POST, { post: savedPost, userId: userId });
      return savedPost;
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

const extractTags = (text: string): string[] => {
  let tags = text.match(/#\w\w*/g);
  if (tags) {
    tags = tags?.map((tag) => tag.replace('#', ''));
    return tags;
  }
  return [];
};
