import { Field, ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';
import { Base } from './base';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Like extends Base {
  @Field(() => User)
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Post;
}
