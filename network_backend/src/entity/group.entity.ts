import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from './base';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Group extends Base {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  members: User[];
}
