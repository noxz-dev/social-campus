import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Chat } from '../entity/chat.entity';
import { ChatMessage } from '../entity/chatmessage.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { log } from '../utils/services/logger';
import { SendMessageInput } from '../validators/sendMessage.validator';
import { SUB_TOPICS } from './notification.resolver';

export interface NewChatMessagePayload {
  message?: ChatMessage;
}

@Resolver(() => Chat)
export class ChatResolver {
  @Authorized()
  @Query(() => [Chat])
  public async myChats(@Ctx() ctx: MyContext): Promise<Chat[]> {
    const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['chats', 'chats.members'] });
    if (!user.chats) return [];
    log.info(`'User with the id: ${userId} called myChats'`);
    return user.chats;
  }

  @Authorized()
  @Query(() => Chat)
  public async chatById(@Ctx() ctx: MyContext, @Arg('chatId') chatId: string): Promise<Chat> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({
      where: { id: chatId },
      relations: ['members', 'messages', 'messages.sendBy'],
    });

    if (!chat) throw Error('no chat found');

    if (checkChatAccess(chat.members, userId)) return chat;

    throw Error('youre not allowed to access this chat');
  }

  @Authorized()
  @Mutation(() => ChatMessage)
  public async sendMessage(@Ctx() ctx: MyContext, @Arg('input') input: SendMessageInput): Promise<ChatMessage> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({ where: { id: input.chatId }, relations: ['members', 'messages'] });

    if (!chat) throw Error('chat not found');
    if (!checkChatAccess(chat.members, userId)) {
      throw Error('youre not allowed to access this chat');
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    const chatMessage = new ChatMessage(user, chat, input.message);
    chat.messages = [...chat.messages, chatMessage];

    const savedMessage = await getRepository(ChatMessage).save(chatMessage);

    ctx.req.pubsub.publish(SUB_TOPICS.NEW_CHAT_MESSAGE, { message: savedMessage });
    log.info(`'User with the id: ${userId} send a message'`);
    return savedMessage;
  }

  @Authorized()
  @Mutation(() => Chat)
  public async createChat(@Ctx() ctx: MyContext, @Arg('memberId') memberId: string): Promise<Chat> {
    const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['chats', 'chats.members'] });
    const member = await getRepository(User).findOne({ where: { id: memberId } });

    const existingChat = user.chats.find((chat) => chat.members.some((cmember) => cmember.id === member.id));
    if (existingChat) return existingChat;
    const chat = new Chat();
    chat.messages = [];
    chat.members = [user, member];

    const savedChat = await getRepository(Chat).save(chat);
    log.info(`'User with the id: ${userId} created a chat'`);
    return savedChat;
  }

  @Subscription(() => ChatMessage, {
    topics: SUB_TOPICS.NEW_CHAT_MESSAGE,
    filter: async ({ payload, args, context }) => {
      const chatId = args.chatId;
      const chat = await getRepository(Chat).findOne({ where: { id: chatId }, relations: ['members'] });
      const user = chat.members.find((user) => user.id === context.user.id);
      if (user) return true;
      return false;
    },
  })
  public async newMessage(
    @Ctx() ctx: MyContext,
    @Root() payload: NewChatMessagePayload,
    @Arg('chatId') chatId: string,
  ): Promise<ChatMessage> {
    return payload.message;
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deleteChatMessage(@Ctx() ctx: MyContext, @Arg('messageId') messageId: string): Promise<boolean> {
    const userId = ctx.req.user.id;
    const message = await getRepository(ChatMessage).findOne({
      where: { id: messageId },
    });
    console.log('DEL message', message);
    const user = message.sendBy;
    if (user.id !== userId) throw Error('youre not allowed to delete this message');

    // const chat = await getRepository(Chat).findOne()

    console.log('TODO');
    log.info(`'User with the id: ${userId} deleted a message'`);
    return true;
  }
}

const checkChatAccess = (members: User[], userId: string): boolean => {
  const user = members.find((member) => member.id === userId);
  if (user) return true;
  return false;
};
