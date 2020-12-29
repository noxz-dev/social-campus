import { Field, ObjectType } from 'type-graphql';
import { AfterLoad, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { log } from '../utils/services/logger';
import { minioClient } from '../utils/services/minio';
import { UserValidator } from '../validators/user.validator';
import { Base } from './base';
import { Group } from './group.entity';
import { Post } from './post.entity';
import { Role } from './role.entity';

@Entity()
@ObjectType()
export class User extends Base {
  @Field(() => String)
  @Column()
  firstname: string;

  @Field(() => String)
  @Column()
  lastname: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profilePicName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  profilePicLink: string;

  @Field(() => String)
  @Column({ type: 'text', nullable: true })
  bio: string;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];

  @AfterLoad()
  async generatePictureLink(): Promise<void> {
    if (this.profilePicLink !== null) {
      console.log("here")
      minioClient.presignedGetObject('profile-pics', this.profilePicName, (err, url: string) => {
        if (err) return log.error('link generation failed');

        const editUrl = url.split('?')[0].replace('http://minio:9000', '');
        this.profilePicLink = editUrl;
      });
    }
  }

  constructor(body: UserValidator, hashedPassword: string) {
    super();
    this.firstname = body?.firstName;
    this.lastname = body?.lastname;
    this.email = body?.email;
    this.password = hashedPassword;
  }
}
