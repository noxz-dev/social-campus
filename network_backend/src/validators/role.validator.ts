import { IsOptional, IsString, IsUppercase } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RoleValidator {
  @Field(() => String)
  @IsString()
  @IsUppercase()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}
