import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base';
import { GroupMemberRole } from './groupMemberRole.entity';
import { Post } from './post.entity';
import { GroupMember, User } from './user.entity';

export enum GroupType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

registerEnumType(GroupType, {
  name: 'GroupType',
});

@Entity()
@ObjectType()
export class Group extends Base {
  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field(() => GroupType)
  @Column({ type: 'enum', enum: GroupType })
  type: GroupType;

  @Field(() => String)
  @Column({
    type: 'varchar',
    nullable: true,
    default:
      '<h2>Willkommen zu dieser Gruppe</h2><p><br></p><p>hier kannst Termine festhalten, Links sammeln oder alles tun was du gerne möchtest.</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>Tipp: Markiere doch diesen Text um den Editor zu öffnen.</p>',
  })
  about: string;

  @Field(() => User)
  @ManyToOne(() => User)
  createdBy: User;

  @Column({ nullable: true, type: 'varchar' })
  password: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field(() => [GroupMember])
  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  members: GroupMember[];

  @OneToMany(() => GroupMemberRole, (groupRole) => groupRole.group)
  memberRoles: GroupMemberRole[];

  @Field(() => Number, { nullable: true })
  numberOfPosts: number;

  @Field(() => Number, { nullable: true })
  numberOfMembers: number;
}
