import { IsString, IsUUID, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SendMessageInput {
  @Field()
  @IsUUID(4, { message: 'chatId is not a valid Id' })
  @MinLength(10)
  chatId: string;

  @Field()
  @IsString()
  @MinLength(1)
  message: string;
}
