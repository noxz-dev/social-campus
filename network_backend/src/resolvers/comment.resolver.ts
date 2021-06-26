import _ from 'lodash';
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Like } from '../entity/like.entity';
import { NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/interfaces';
import { isMemberOfGroup } from './group.resolver';
import { notify } from './notification.resolver';

@Resolver(() => Comment)
export class CommentResolver {
  /**
   * Mutation to create an new comment for a specified post
   */
  @Authorized()
  @Mutation(() => Comment, { description: 'Creates a new comment and adds it to a post' })
  public async addComment(
    @Ctx() ctx: MyContext,
    @Arg('text', () => String) text: string,
    @Arg('postID', () => String) postID: string,
  ): Promise<Comment | null> {
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('youre not authenticated');

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found!');

    const post = await getRepository(Post).findOne({
      where: { id: postID },
      relations: ['user', 'group', 'group.members'],
    });

    if (!post) throw new Error('Post not found!');

    if (post.group && !(await isMemberOfGroup(post.group.id, userId))) {
      throw new Error('youre not allowed to interact with this content');
    }

    const comment = new Comment();
    comment.text = text;
    comment.user = user;
    comment.post = post;
    comment.likes = [];
    const savedComment = await getRepository(Comment).save(comment);

    if (text.match(/@[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g) !== null) {
      for await (const mention of text.match(/@[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g)) {
        const toUser = await getRepository(User).findOne({ where: { username: mention.substring(1) } });
        if (post.group) {
          const foundUser = post.group.members.find((member) => member.id === toUser.id);
          if (!foundUser) continue;
        }
        if (!toUser) continue;

        await notify(
          {
            type: NotificationType.MENTION,
            message: `${user.firstname} hat dich in einem Kommentar erwähnt`,
            toUser: toUser,
            fromUser: user,
            post: post,
          },
          ctx,
        );
      }
    }
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

  /**
   * Like an comment
   */
  @Authorized()
  @Mutation(() => Comment)
  public async likeComment(
    @Ctx() ctx: MyContext,
    @Arg('commentID', () => String) commentID: string,
  ): Promise<Comment | null> {
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

  /**
   * Remove the like of an comment
   */
  @Authorized()
  @Mutation(() => Comment)
  public async unlikeComment(
    @Ctx() ctx: MyContext,
    @Arg('commentID', () => String) commentID: string,
  ): Promise<Comment | null> {
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

  /**
   * Delete an Comment
   */
  @Authorized()
  @Mutation(() => Comment)
  public async deleteComment(
    @Ctx() ctx: MyContext,
    @Arg('commentId', () => String) commentId: string,
  ): Promise<Comment> {
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('user not authenticated');

    const comment = await getRepository(Comment).findOne({
      relations: ['user', 'post'],
      where: { id: commentId },
    });
    if (!comment) throw new Error('comment not found');

    await getRepository(Comment).remove(comment);

    return comment;
  }

  /**
   * Field Resolver to resolve the user field from the comment
   */
  @FieldResolver()
  async user(@Root() comment: Comment): Promise<User> {
    const c = await getRepository(Comment).findOne({ where: { id: comment.id }, relations: ['user'] });
    return c.user;
  }
}
