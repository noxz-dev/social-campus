import { IsString, IsUUID, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SendMessageInput {
  @Field(() => String)
  @IsUUID(4, { message: 'chatId is not a valid Id' })
  @MinLength(10)
  chatId: string;

  @Field(() => String)
  @IsString()
  @MinLength(1)
  message: string;
}
