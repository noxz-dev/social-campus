import { IsOptional, IsString, IsUppercase } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RoleValidator {
  @Field()
  @IsString()
  @IsUppercase()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}
