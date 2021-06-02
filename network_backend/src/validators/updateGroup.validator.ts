import { IsOptional, IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { GroupType } from '../entity/group.entity';

@InputType()
export class UpdateGroupInput {
  @Field(() => String)
  @IsString()
  groupId: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description: string;

  @Field(() => GroupType, { nullable: true })
  type: GroupType;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  password: string;
}
