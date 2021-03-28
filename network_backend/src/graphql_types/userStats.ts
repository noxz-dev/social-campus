import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserStats {
  @Field()
  postCount: number;

  @Field()
  followerCount: number;

  @Field()
  followingCount: number;

  constructor(postCount: number, followerCount: number, followingCount: number) {
    this.postCount = postCount;
    this.followerCount = followerCount;
    this.followingCount = followingCount;
  }
}
