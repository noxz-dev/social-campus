import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { NotificationPayload } from '../resolvers/notification.resolver';
import { Base } from './base';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

export enum NotificationType {
  NEW_FOLLOWER = 'NEW_FOLLOWER',
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

  @ManyToOne(() => Post, { onDelete: 'CASCADE', nullable: true })
  post: Post;

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
