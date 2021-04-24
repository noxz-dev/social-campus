import { Field, ObjectType } from 'type-graphql';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from './base';
import { ChatMessage } from './chatmessage.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Chat extends Base {
  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  members: User[];

  @Field(() => [ChatMessage])
  @OneToMany(() => ChatMessage, (message) => message.chat)
  messages: ChatMessage[];

  @Field(() => ChatMessage, { nullable: true })
  lastMessage: ChatMessage;
}
