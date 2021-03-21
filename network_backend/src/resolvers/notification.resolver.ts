/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Notification, NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { log } from '../utils/services/logger';

export enum SUB_TOPICS {
  NEW_NOTIFICATION = 'NEW_NOTIFICATION',
  NEW_POST = 'NEW_POST',
}

export interface NotificationPayload {
  type: NotificationType;
  message: string;
  fromUser: User;
  toUser: User;
  post?: Post;
  comment?: Comment;
}

@Resolver(() => Notification)
export class NotificationResolver {
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
      relations: ['toUser', 'fromUser'],
    });
    return notifys;
  }

  @Subscription(() => Notification, {
    topics: SUB_TOPICS.NEW_NOTIFICATION,
    filter: ({ args, payload }) => {
      if (args.userId === payload.toUser.id) {
        return true;
      }
      return false;
    },
  })
  public async notifications(@Root() payload: Notification, @Arg('userId') userId: string): Promise<Notification> {
    log.debug('notification subscription fired');

    return payload;
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deleteNotification(
    @Ctx() ctx: MyContext,
    @Arg('notificationId') notifyId: string,
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

export const notify = async (payload: NotificationPayload, context: MyContext): Promise<void> => {
  log.info('Notifcation send');

  const notify = new Notification(payload);

  await getRepository(Notification).save(notify);

  context.req.pubsub.publish(SUB_TOPICS.NEW_NOTIFICATION, notify);
};
