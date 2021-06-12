import { IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  @IsString()
  @MinLength(5)
  password: string;
}
