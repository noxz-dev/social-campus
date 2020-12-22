import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base';
import { Like } from './like.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Comment extends Base {
  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
