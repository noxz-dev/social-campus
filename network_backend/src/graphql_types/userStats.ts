import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserStats {
  @Field(() => String)
  postCount: number;

  @Field(() => String)
  followerCount: number;

  @Field(() => String)
  followingCount: number;

  constructor(postCount: number, followerCount: number, followingCount: number) {
    this.postCount = postCount;
    this.followerCount = followerCount;
    this.followingCount = followingCount;
  }
}
