import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LikeCountResponse {
  @Field()
  @Field()
  likeCount: number;
}
