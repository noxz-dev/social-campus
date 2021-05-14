import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SendMessageInput {
  @Field(() => String)
  @IsUUID(4, { message: 'chatId is not a valid Id' })
  @MinLength(10)
  chatId: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  message: string;

  @Field(() => GraphQLUpload, { nullable: true })
  file: FileUpload;
}
