import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base';
import { Chat } from './chat.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class ChatMessage extends Base {
  @Field(() => User)
  @ManyToOne(() => User)
  sendBy: User;

  @Field(() => Chat)
  @ManyToOne(() => Chat)
  chat: Chat;

  @Field(() => String)
  @Column({ type: 'varchar' })
  content: string;

  constructor(sendBy: User, chat: Chat, content: string) {
    super();
    this.sendBy = sendBy;
    this.chat = chat;
    this.content = content;
  }
}
