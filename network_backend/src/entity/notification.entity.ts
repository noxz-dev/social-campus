import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { NotificationPayload } from '../resolvers/notification.resolver';
import { Base } from './base';
import { Chat } from './chat.entity';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

export enum NotificationType {
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  NEW_COMMENT = 'NEW_COMMENT',
  POST_LIKE = 'POST_LIKE',
  MENTION = 'MENTION',
  NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
});

@ObjectType()
@Entity()
export class Notification extends Base {
  @Field(() => NotificationType)
  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Field(() => String)
  @Column()
  message: string;

  @Field(() => User)
  @ManyToOne(() => User)
  fromUser: User;

  @Field(() => User)
  @ManyToOne(() => User)
  toUser: User;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, { onDelete: 'CASCADE', nullable: true })
  post: Post;

  @Field(() => Chat, { nullable: true })
  @ManyToOne(() => Chat, { onDelete: 'CASCADE', nullable: true })
  chat: Chat;

  @ManyToOne(() => Comment, { onDelete: 'CASCADE', nullable: true })
  comment: Comment;

  constructor(payload: NotificationPayload) {
    super();
    this.type = payload?.type;
    this.message = payload?.message;
    this.fromUser = payload?.fromUser;
    this.toUser = payload?.toUser;
    this.post = payload?.post;
    this.comment = payload?.comment;
  }
}
