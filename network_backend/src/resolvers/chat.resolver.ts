import { Chat } from '../entity/chat.entity';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { ChatMessage } from '../entity/chatmessage.entity';
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
  @Mutation(() => ChatMessage)
  public async sendMessage(
    @Ctx() ctx: MyContext,
    @Arg('chatId') chatId: string,
    @Arg('message') message: string,
  ): Promise<ChatMessage> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({ where: { id: chatId }, relations: ['members', 'messages'] });

    if (!checkChatAccess(chat.members, userId)) {
      throw Error('youre not allowed to access this chat');
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    const chatMessage = new ChatMessage(user, chat, message);
    chat.messages = [...chat.messages, chatMessage];

    ctx.req.pubsub.publish(SUB_TOPICS.NEW_CHAT_MESSAGE, { message: chatMessage });
    return chatMessage;
  }

  @Authorized()
  @Mutation(() => Chat)
  public async createChat(@Ctx() ctx: MyContext, @Arg('memberId') memberId: string): Promise<Chat> {
    const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['chats', 'chats.member'] });
    const member = await getRepository(User).findOne({ where: { id: memberId } });

    const existingChat = user.chats.find((chat) => chat.members.includes(member));
    console.log('existing chat', existingChat);
    const chat = new Chat();
    chat.messages = [];
    chat.members = [user, member];

    const savedChat = await getRepository(Chat).save(chat);

    return savedChat;
  }

  @Subscription(() => ChatMessage, {
    topics: SUB_TOPICS.NEW_CHAT_MESSAGE,
    filter: async ({ payload, args, context }) => {
      const chatId = args.chatId;

      const chat = await getRepository(Chat).findOne({ where: { id: chatId }, relations: ['members'] });
      console.log('FILTER SUB CONTEXT', context);
      const user = chat.members.find((user) => user.id === context.req.user.id);
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
    return true;
  }
}

const checkChatAccess = (members: User[], userId: string): boolean => {
  const user = members.find((member) => member.id === userId);
  if (user) return true;
  return false;
};
