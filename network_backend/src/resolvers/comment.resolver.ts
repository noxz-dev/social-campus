import _ from 'lodash';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Like } from '../entity/like.entity';
import { NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { notify } from './notification.resolver';

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

    const user = await getRepository(User).findOne({ where: { id: id } });
    if (!user) {
      return null;
    }

    const post = await getRepository(Post).findOne({ where: { id: postID }, relations: ['user'] });
    if (!post) {
      return null;
    }
    const comment = new Comment();
    comment.text = text;
    comment.user = user;
    comment.post = post;
    comment.likes = [];
    const savedComment = await getRepository(Comment).save(comment);
    await notify(
      {
        type: NotificationType.NEW_COMMENT,
        message: `${user.firstname} hat einen Kommentar geschrieben`,
        fromUser: user,
        toUser: post.user,
        post: post,
        comment: savedComment,
      },
      ctx,
    );
    return savedComment;
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

  @Authorized()
  @Mutation(() => Comment)
  public async unlikeComment(@Ctx() ctx: MyContext, @Arg('commentID') commentID: string): Promise<Comment | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const comment = await getRepository(Comment).findOne({
      relations: ['likes', 'likes.user', 'user', 'likes.comment'],
      where: { id: commentID },
    });
    if (!comment) {
      return null;
    }

    let like;
    _.remove(comment.likes, (currentObject) => {
      if (currentObject.comment.id === commentID) {
        like = currentObject;
        return true;
      }
      return false;
    });

    if (like) {
      await getRepository(Like).remove(like);
    }

    await getRepository(Comment).save(comment);
    return comment;
  }
}
