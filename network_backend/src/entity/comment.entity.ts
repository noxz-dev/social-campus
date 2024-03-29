import { Field, ObjectType } from 'type-graphql';
import { AfterLoad, Column, Entity, getRepository, ManyToOne, OneToMany } from 'typeorm';
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
  @Column({ type: 'varchar' })
  text: string;

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @Field(() => Number)
  async likesCount(): Promise<number> {
    const { count } = await getRepository(Like)
      .createQueryBuilder('like')
      .where('like.comment = :id', { id: this.id })
      .select('COUNT(*)', 'count')
      .getRawOne();

    return count;
  }

  // @AfterLoad()
  // async countLikes(): Promise<void> {
  //   const { count } = await getRepository(Like)
  //     .createQueryBuilder('like')
  //     .where('like.comment = :id', { id: this.id })
  //     .select('COUNT(*)', 'count')
  //     .getRawOne();

  //   this.likesCount = count;
  // }
}
