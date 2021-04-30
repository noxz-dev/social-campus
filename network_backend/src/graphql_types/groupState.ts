import { Field, ObjectType } from 'type-graphql';
import { GroupType } from '../entity/group.entity';

@ObjectType()
export class GroupState {
  @Field(() => String)
  id: string;

  @Field(() => GroupType)
  type: GroupType;

  @Field(() => Boolean)
  isMember: boolean;
}
