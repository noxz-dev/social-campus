/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Chat } from '../entity/chat.entity';
import { ChatMessage } from '../entity/chatmessage.entity';
import { Comment } from '../entity/comment.entity';
import { Notification, NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/interfaces';
import { log } from '../utils/services/logger';

export enum SUB_TOPICS {
  NEW_NOTIFICATION = 'NEW_NOTIFICATION',
  NEW_POST = 'NEW_POST',
  NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE',
}

export interface NotificationPayload {
  type: NotificationType;
  message: string;
  fromUser: User;
  toUser: User;
  post?: Post;
  comment?: Comment;
  chat?: Chat;
  chatMessage?: ChatMessage;
}

@Resolver(() => Notification)
export class NotificationResolver {
  /**
   * get all notifications
   */
  @Authorized()
  @Query(() => [Notification])
  public async getNotifications(@Ctx() ctx: MyContext): Promise<Notification[] | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const notifys = await getRepository(Notification).find({
      where: {
        toUser: userId,
      },
      relations: ['toUser', 'fromUser', 'post', 'chat', 'chatMessage'],
      order: { createdAt: 'DESC' },
    });

    for await (const { chat } of notifys) {
      const messages = await getRepository(ChatMessage).find({
        where: { chat: chat },
        order: { createdAt: 'DESC' },
        take: 1,
      });
      if (messages[0]) {
        chat.lastMessage = messages[0];
      }
    }

    return notifys;
  }

  /**
   * Subscribe to new notification
   */
  @Subscription(() => Notification, {
    topics: SUB_TOPICS.NEW_NOTIFICATION,
    filter: ({ args, payload }) => {
      if (args.userId === payload.toUser.id) {
        return true;
      }
      return false;
    },
  })
  public async notifications(
    @Root() payload: Notification,
    @Arg('userId', () => String) userId: string,
  ): Promise<Notification> {
    log.debug('notification subscription fired');
    payload.createdAt = new Date(payload.createdAt);
    return payload;
  }

  /**
   * Delete a notifiation
   */
  @Authorized()
  @Mutation(() => Boolean)
  public async deleteNotification(
    @Ctx() ctx: MyContext,
    @Arg('notificationId', () => String) notifyId: string,
  ): Promise<boolean | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const notify = await getRepository(Notification).findOne({
      where: {
        id: notifyId,
      },
      relations: ['toUser', 'fromUser'],
    });

    if (notify.toUser.id === userId) {
      await getRepository(Notification).delete({ id: notify.id });
      return true;
    }
    throw Error('youre not allowed to do that');
  }
}

/**
 * Helper Function to generate new notifcations from anywhere
 */
export const notify = async (payload: NotificationPayload, context: MyContext): Promise<void> => {
  if (context.req.user.id === payload.toUser.id) return;
  const notify = new Notification(payload);
  if (payload.post) notify.post = payload.post;
  if (payload.chat) notify.chat = payload.chat;
  if (payload.chatMessage) notify.chatMessage = payload.chatMessage;
  const savedNotification = await getRepository(Notification).save(notify);
  context.req.pubsub.publish(SUB_TOPICS.NEW_NOTIFICATION, savedNotification);
  log.info('Notifcation send');
};
