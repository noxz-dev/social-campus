import { Field, ObjectType } from 'type-graphql';
import { Entity, JoinTable, ManyToMany } from 'typeorm';
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
  messages: ChatMessage[];
}