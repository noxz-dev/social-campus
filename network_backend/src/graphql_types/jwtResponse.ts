import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class JwtResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
