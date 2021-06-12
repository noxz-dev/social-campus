import { Field, ObjectType } from 'type-graphql';
import { Group, GroupType } from '../entity/group.entity';
import { Media } from '../entity/media.entity';

@ObjectType()
export class PreviewGroup {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => GroupType)
  type: GroupType;

  @Field(() => Number, { nullable: true })
  numberOfMembers: number;

  @Field(() => [Media], { nullable: true })
  previewAvatars: Media[];

  constructor(group: Group) {
    console.log(group.members);
    this.id = group.id;
    this.name = group.name;
    this.description = group.description || '';
    this.type = group.type;
    this.numberOfMembers = group.numberOfMembers;
    this.previewAvatars = group.members.map((m) => m.avatar).slice(0, 3);
  }
}
