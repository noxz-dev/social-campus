import { Field, ObjectType } from 'type-graphql';
import { Group } from '../entity/group.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';

@ObjectType()
export class Search {
  @Field(() => [User])
  users: User[];

  @Field(() => [Group])
  groups: Group[];

  @Field(() => [Tag])
  tags: Tag[];
}
