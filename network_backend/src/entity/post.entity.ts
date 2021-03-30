import { Field, ObjectType } from 'type-graphql';
import { AfterLoad, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { countComments, countLikes } from '../resolvers/post.resolver';
import { log } from '../utils/services/logger';
import { minioClient } from '../utils/services/minio';
import { Base } from './base';
import { Comment } from './comment.entity';
import { Group } from './group.entity';
import { Like } from './like.entity';
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

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Field(() => Number)
  likesCount: number;

  @Field(() => Number)
  commentCount: number;

  @Field(() => Boolean)
  liked: boolean;

  @Column({ nullable: true })
  imageName: string;

  @Field(() => String, { nullable: true })
  imageLink: string;

  @Field(() => Boolean)
  @Column({ default: false })
  edited: boolean;

  @AfterLoad()
  async generateImageLink(): Promise<void> {
    if (this.imageName) {
      minioClient.presignedGetObject('post-images', this.imageName, (err, url: string) => {
        if (err) return log.error('link generation failed');

        const editUrl = url.split('?')[0].replace('http://minio:9000', '');
        this.imageLink = editUrl;
      });
    }
  }

  @AfterLoad()
  async countLikes(): Promise<void> {
    this.likesCount = await countLikes(this.id);
  }

  @AfterLoad()
  async countComments(): Promise<void> {
    this.commentCount = await countComments(this.id);
  }
}
