import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Like } from '../entity/like.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';

@Resolver(() => Comment)
export class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  public async addComment(
    @Ctx() ctx: MyContext,
    @Arg('text') text: string,
    @Arg('postID') postID: string,
  ): Promise<Comment | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: ctx.req.user.id } });
    if (!user) {
      return null;
    }

    const post = await getRepository(Post).findOne({ where: { id: postID } });
    if (!post) {
      return null;
    }
    const comment = new Comment();
    comment.text = text;
    comment.user = user;
    comment.post = post;
    comment.likes = [];
    await getRepository(Comment).save(comment);
    return comment;
  }

  @Authorized()
  @Mutation(() => Comment)
  public async likeComment(@Ctx() ctx: MyContext, @Arg('commentID') commentID: string): Promise<Comment | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: id } });
    if (!user) {
      return null;
    }

    const comment = await getRepository(Comment).findOne({
      relations: ['likes', 'likes.user', 'user'],
      where: { id: commentID },
    });
    if (!comment) {
      return null;
    }

    for (const like of comment.likes) {
      if (id === like.user.id) throw new Error('you already liked this post');
    }

    const like = new Like();
    like.user = user;

    comment.likes.push(like);
    await getRepository(Like).save(like);
    await getRepository(Comment).save(comment);
    return comment;
  }
}
