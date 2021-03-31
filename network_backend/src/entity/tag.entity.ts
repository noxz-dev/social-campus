import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Base } from './base';
import { Post } from './post.entity';
import { User } from './user.entity';

interface TagPayload {
  name: string;
  createdBy: User;
}

@ObjectType()
@Entity()
export class Tag extends Base {
  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => User)
  @ManyToOne(() => User)
  createdBy: User;

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.tags, { onDelete: 'CASCADE', nullable: true })
  posts: Post[];

  constructor(payload: TagPayload) {
    super();
    this.name = payload?.name;
    this.createdBy = payload?.createdBy;
  }
}
