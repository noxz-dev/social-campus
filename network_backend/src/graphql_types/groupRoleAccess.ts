import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class GroupRoleAccess {
  @Field(() => Boolean)
  isAllowed: boolean;
}
