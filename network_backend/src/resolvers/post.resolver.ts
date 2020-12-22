import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Like } from '../entity/like.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { LikeCountResponse } from '../graphql_types/likeCountResponse';
import { MyContext } from '../utils/interfaces/context.interface';

@Resolver(() => Post)
export class PostResolver {
  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPosts returns all posts from a given userID',
  })
  public async getPosts(@Arg('userID') userID: string): Promise<Post[] | null> {
    const posts = await getRepository(Post).find({
      relations: ['comments', 'user', 'likes', 'likes.user', 'comments.user', 'comments.likes', 'comments.likes.user'],
      where: { user: { id: userID } },
    });
    if (!posts) {
      return null;
    }
    return posts;
  }

  @Authorized()
  @Mutation(() => Post)
  public async addPost(@Ctx() ctx: MyContext, @Arg('text') text: string): Promise<Post | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({
      relations: [
        'posts',
        'post.comments',
        'post.user',
        'post.likes',
        'post.likes.user',
        'post.comments.user',
        'post.comments.likes',
        'post.comments.likes.user',
      ],
      where: { id: ctx.req.user.id },
    });
    if (!user) {
      return null;
    }

    const post = new Post();
    post.text = text;
    post.user = user;
    post.likes = [];
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
  @Query(() => LikeCountResponse)
  public async getLikeCountFromPost(@Arg('postID') postID: string): Promise<LikeCountResponse | null> {
    const post = await getRepository(Post).findOne({ relations: ['likes'], where: { id: postID } });
    if (!post) {
      return null;
    }

    const likeCount = new LikeCountResponse();

    likeCount.likeCount = post.likes.length;

    return likeCount;
  }
}
