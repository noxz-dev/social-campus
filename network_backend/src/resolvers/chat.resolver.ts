import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../entity/chat.entity';
import { ChatMessage } from '../entity/chatmessage.entity';
import { NotificationType } from '../entity/notification.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';
import { log } from '../utils/services/logger';
import { SendMessageInput } from '../validators/sendMessage.validator';
import { notify, SUB_TOPICS } from './notification.resolver';

export interface NewChatMessagePayload {
  message?: ChatMessage;
}

@Resolver(() => Chat)
export class ChatResolver {
  @Authorized()
  @Query(() => [Chat])
  public async myChats(@Ctx() ctx: MyContext): Promise<Chat[]> {
    const userId = ctx.req.user.id;

    //TODO Rewrite with querybuilder
    const user = await getRepository(User).findOne({
      where: { id: userId },
      relations: ['chats', 'chats.members'],
    });
    if (!user.chats) return [];

    for await (const chat of user.chats) {
      const messages = await getRepository(ChatMessage).find({
        where: { chat: chat },
        order: { createdAt: 'DESC' },
        take: 1,
      });
      if (messages[0]) {
        chat.lastMessage = messages[0];
      } else {
        const message = new ChatMessage(user, chat, 'neuer chat');
        message.id = uuidv4();
        message.createdAt = chat.createdAt;
        chat.lastMessage = message;
      }
    }
    user.chats.sort((a, b) => (a.lastMessage.createdAt < b.lastMessage.createdAt ? 1 : -1));
    log.info(`'User with the id: ${userId} called myChats'`);
    return user.chats;
  }

  @Authorized()
  @Query(() => Chat)
  public async chatById(@Ctx() ctx: MyContext, @Arg('chatId', () => String) chatId: string): Promise<Chat> {
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
  public async sendMessage(
    @Ctx() ctx: MyContext,
    @Arg('input', () => SendMessageInput) input: SendMessageInput,
  ): Promise<ChatMessage> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({ where: { id: input.chatId }, relations: ['members', 'messages'] });

    if (!chat) throw Error('chat not found');
    if (!checkChatAccess(chat.members, userId)) {
      throw Error('youre not allowed to access this chat');
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    const chatMessage = new ChatMessage(user, chat, input.message);
    chat.messages = [...chat.messages, chatMessage];
    chat.lastMessage = chatMessage;

    const savedMessage = await getRepository(ChatMessage).save(chatMessage);

    const toUser = chat.members.find((member) => member.id !== userId);

    await ctx.req.pubsub.publish(SUB_TOPICS.NEW_CHAT_MESSAGE, { message: savedMessage, members: chat.members });
    await notify(
      {
        fromUser: user,
        toUser: toUser,
        type: NotificationType.NEW_CHAT_MESSAGE,
        message: ' Neue Nachricht von ' + user.firstname,
        chat: chat,
        chatMessage: savedMessage,
      },
      ctx,
    );
    log.info(`'User with the id: ${userId} send a message'`);
    return savedMessage;
  }

  @Authorized()
  @Mutation(() => Chat)
  public async createChat(@Ctx() ctx: MyContext, @Arg('memberId', () => String) memberId: string): Promise<Chat> {
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
      const user = payload.members.find((user) => user.id === context.user.id);
      if (user) return true;
      return false;
    },
  })
  public async newMessage(
    @Ctx() ctx: MyContext,
    @Root() payload: NewChatMessagePayload,
    @Arg('chatId', () => String) chatId: string,
  ): Promise<ChatMessage> {
    return payload.message;
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async deleteChatMessage(
    @Ctx() ctx: MyContext,
    @Arg('messageId', () => String) messageId: string,
  ): Promise<boolean> {
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
