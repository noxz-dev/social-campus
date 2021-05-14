import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from './base';
import { Chat } from './chat.entity';
import { Media } from './media.entity';
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

  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media, { nullable: true })
  @JoinColumn()
  media: Promise<Media>;

  constructor(sendBy: User, chat: Chat, content: string) {
    super();
    this.sendBy = sendBy;
    this.chat = chat;
    this.content = content;
  }
}
