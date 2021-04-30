import { IsEmail, IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserValidator {
  @Field(() => String)
  @IsString()
  @MinLength(2)
  firstName: string;

  @Field(() => String)
  @IsString()
  @MinLength(2)
  lastname: string;

  @Field(() => String)
  @IsString()
  @MinLength(3, { message: 'Username muss aus min. 3 Zeichen bestehen' })
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(5)
  password: string;
}
