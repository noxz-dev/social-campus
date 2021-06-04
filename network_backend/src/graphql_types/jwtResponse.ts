import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class JwtResponse {
  @Field(() => String)
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
