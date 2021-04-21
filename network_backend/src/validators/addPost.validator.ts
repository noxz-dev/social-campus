import { IsArray, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddPostInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  content: string;

  @Field(() => GraphQLUpload, { nullable: true })
  file: FileUpload;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  @MinLength(10)
  groupId: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  tags: string[];
}
