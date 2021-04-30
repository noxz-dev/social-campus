import { IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateProfileInput {
  @Field(() => String)
  @IsString()
  bio: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  interests: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  faculty: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  studyCourse: string;

  @Field(() => GraphQLUpload, { nullable: true })
  avatar: FileUpload;

  //   @Field(() => GraphQLUpload, { nullable: true })
  //   banner: FileUpload;
}
