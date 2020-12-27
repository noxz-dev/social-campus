import { createWriteStream, unlink } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import _ from 'lodash';
import os from 'os';
import path from 'path';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../entity/group.entity';
import { Like } from '../entity/like.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { log } from '../utils/services/logger';
import { minioClient } from '../utils/services/minio';

@Resolver(() => Post)
export class PostResolver {
  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPosts returns all posts from a given userID',
  })
  public async getPostsFromUser(@Arg('userID') userID: string): Promise<Post[] | null> {
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
    });
    if (!posts) {
      return null;
    }
    return posts;
  }

  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPosts returns all posts from a given groupID',
  })
  public async getPostsFromGroup(@Arg('groupID') groupID: string): Promise<Post[] | null> {
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
    });
    if (!posts) {
      return null;
    }
    return posts;
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
      relations: [
        'posts',
        'posts.comments',
        'posts.user',
        'posts.group',
        'posts.user.followers',
        'posts.user.following',
        'posts.likes',
        'posts.likes.user',
        'posts.comments.user',
        'posts.comments.likes',
        'posts.comments.likes.user',
      ],
      where: { id: ctx.req.user.id },
    });
    if (!user) {
      return null;
    }
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

      user.profilePicName = newFileName;
    }
    let group;
    if (groupID) {
      group = getRepository(Group).findOne({ where: { id: groupID } });
    }

    if (groupID && !group) {
      return null;
    }

    const post = new Post();
    post.text = text;
    post.user = user;
    post.likes = [];
    post.group = group;
    user.posts.push(post);
    await getRepository(Post).save(post);
    await getRepository(User).save(user);
    return post;
  }

  @Authorized()
  @Mutation(() => Post)
  public async likePost(@Ctx() ctx: MyContext, @Arg('postID') postID: string): Promise<Post | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: id } });
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
      if (id === like.user.id) throw new Error('you already liked this post');
    }

    const like = new Like();
    like.user = user;

    post.likes.push(like);
    await getRepository(Like).save(like);
    await getRepository(Post).save(post);
    return post;
  }

  @Authorized()
  @Mutation(() => Post)
  public async unlikePost(@Ctx() ctx: MyContext, @Arg('postID') postID: string): Promise<Post | null> {
    const id = ctx.req.user.id;
    if (!id) {
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
    return post;
  }
}
