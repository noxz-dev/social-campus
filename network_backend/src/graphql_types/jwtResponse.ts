import { ObjectType, Field, Root } from 'type-graphql';

@ObjectType()
export class JwtResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
