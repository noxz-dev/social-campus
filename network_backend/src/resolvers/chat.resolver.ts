import { Chat } from '../entity/chat.entity';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { ChatMessage } from '../entity/chatmessage.entity';

@Resolver(() => Chat)
export class ChatResolver {
  @Authorized()
  @Query(() => [Chat])
  public async myChats(@Ctx() ctx: MyContext): Promise<Chat[]> {
    const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['chats'] });
    if (!user.chats) return [];
    return user.chats;
  }

  @Authorized()
  @Query(() => Chat)
  public async chatById(@Ctx() ctx: MyContext, @Arg('chatId') chatId: string): Promise<Chat> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({ where: { id: chatId }, relations: ['members', 'messages'] });

    if (!chat) throw Error('no chat found');

    if (checkChatAccess(chat.members, userId)) return chat;

    throw Error('youre not allowed to access this chat');
  }

  @Authorized()
  @Mutation(() => Chat)
  public async sendMessage(
    @Ctx() ctx: MyContext,
    @Arg('chatId') chatId: string,
    @Arg('message') message: string,
  ): Promise<Chat> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({ where: { id: chatId }, relations: ['members', 'messages'] });

    if (!checkChatAccess(chat.members, userId)) {
      throw Error('youre not allowed to access this chat');
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    const chatMessage = new ChatMessage(user, chat, message);
    chat.messages = [...chat.messages, chatMessage];

    return chat;
  }

  @Authorized()
  @Mutation(() => Chat)
  public async createChat(): Promise<Chat> {
    return;
  }
}

const checkChatAccess = (members: User[], userId: string): boolean => {
  const user = members.find((member) => member.id === userId);
  if (user) return true;
  return false;
};
