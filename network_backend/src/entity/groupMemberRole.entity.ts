import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Base } from './base';
import { Group } from './group.entity';
import { User } from './user.entity';

export enum GroupRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

registerEnumType(GroupRole, {
  name: 'GroupRoles',
});

@ObjectType()
@Entity()
@Unique(['group', 'user'])
export class GroupMemberRole extends Base {
  @Field(() => Group)
  @ManyToOne(() => Group)
  group: Group;

  @Field(() => Boolean)
  @Column({ type: 'enum', enum: GroupRole, default: GroupRole.MEMBER })
  role: GroupRole;

  @Field(() => [User])
  @ManyToOne(() => User)
  user: User;
}
