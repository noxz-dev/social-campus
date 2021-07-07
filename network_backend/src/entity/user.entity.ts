import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { UserValidator } from '../validators/user.validator';
import { Base } from './base';
import { Chat } from './chat.entity';
import { Group } from './group.entity';
import { GroupRole } from './groupMemberRole.entity';
import { Media } from './media.entity';
import { Post } from './post.entity';
import { Role } from './role.entity';

@Entity()
@ObjectType()
export class User extends Base {
  @Field(() => String)
  @Column({ type: 'varchar' })
  firstname: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  lastname: string;

  @Field(() => String)
  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Field(() => Boolean)
  @Column({ default: false, type: 'bool' })
  activated: boolean;

  @Field(() => String)
  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media, { eager: true })
  @JoinColumn()
  avatar: Media;

  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media)
  @JoinColumn()
  banner: Media;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  faculty: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  studyCourse: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  interests: string;

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

  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Chat[];

  @Field(() => Boolean)
  meFollowing: boolean;

  @Field(() => Boolean)
  @Column({ default: false, type: 'bool' })
  onlineStatus: boolean;

  constructor(body: UserValidator, hashedPassword: string) {
    super();
    this.firstname = body?.firstName;
    this.lastname = body?.lastname;
    this.username = body?.username;
    this.email = body?.email;
    this.password = hashedPassword;
  }
}

@ObjectType()
export class GroupMember extends User {
  @Field(() => GroupRole, { nullable: true })
  groupRole: GroupRole;
}
