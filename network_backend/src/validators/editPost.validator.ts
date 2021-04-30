import { IsString, IsUUID, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class EditPostInput {
  @Field(() => String)
  @IsUUID(4, { message: 'chatId is not a valid Id' })
  @MinLength(10)
  postId: string;

  @Field(() => String)
  @IsString()
  @MinLength(1)
  content: string;
}
