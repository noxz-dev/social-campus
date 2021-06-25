import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserStats {
  @Field(() => Number)
  postCount: number;

  @Field(() => Number)
  followerCount: number;

  @Field(() => Number)
  followingCount: number;

  constructor(postCount: number, followerCount: number, followingCount: number) {
    this.postCount = postCount;
    this.followerCount = followerCount;
    this.followingCount = followingCount;
  }
}
