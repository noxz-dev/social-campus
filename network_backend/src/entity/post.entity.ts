import { Field, ObjectType } from 'type-graphql';
import { AfterLoad, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { countComments, countLikes } from '../resolvers/post.resolver';
import { Base } from './base';
import { Comment } from './comment.entity';
import { Group } from './group.entity';
import { Like } from './like.entity';
import { Media } from './media.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Post extends Base {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => Group, { nullable: true })
  @ManyToOne(() => Group, (group) => group.posts)
  group: Group;

  @Field(() => String)
  @Column({ type: 'text' })
  text: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @Field(() => Number, { nullable: true })
  likesCount: number;

  @Field(() => Number, { nullable: true })
  commentCount: number;

  @Field(() => Boolean, { nullable: true })
  liked: boolean;

  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn()
  media: Media;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false, type: 'bool' })
  edited: boolean;

  @AfterLoad()
  async countLikes(): Promise<void> {
    this.likesCount = await countLikes(this.id);
  }

  @AfterLoad()
  async countComments(): Promise<void> {
    this.commentCount = await countComments(this.id);
  }
}
