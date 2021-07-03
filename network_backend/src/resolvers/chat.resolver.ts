import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { getManager, getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../entity/chat.entity';
import { ChatMessage } from '../entity/chatmessage.entity';
import { Media, MediaType } from '../entity/media.entity';
import { NotificationType } from '../entity/notification.entity';
import { User } from '../entity/user.entity';
import { uploadFileGraphql } from '../utils/helpers/fileUpload';
import { MyContext } from '../utils/interfaces/interfaces';
import { log } from '../utils/services/logger';
import { SendMessageInput } from '../validators/sendMessage.validator';
import { notify, SUB_TOPICS } from './notification.resolver';

export interface NewChatMessagePayload {
  message?: ChatMessage;
}

@Resolver(() => Chat)
export class ChatResolver {
  /**
   * Query to get all chats from the logged in user
   */
  @Authorized()
  @Query(() => [Chat])
  public async myChats(@Ctx() ctx: MyContext): Promise<Chat[]> {
    const userId = ctx.req.user.id;

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
        //mock a lastmessage if none exist
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

  /**
   * Query to get a chat by a given Id
   */
  @Authorized()
  @Query(() => Chat)
  public async chatById(@Ctx() ctx: MyContext, @Arg('chatId', () => String) chatId: string): Promise<Chat> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({
      where: { id: chatId },
      relations: ['members'],
    });

    const messages = await getRepository(ChatMessage).find({
      where: { chat: chatId },
      relations: ['sendBy'],
      order: {
        createdAt: 'ASC',
      },
    });

    chat.messages = messages;

    if (!chat) throw Error('no chat found');

    if (checkChatAccess(chat.members, userId)) return chat;

    throw Error('youre not allowed to access this chat');
  }

  /**
   * Mutation, send a new chat message
   */
  @Authorized()
  @Mutation(() => ChatMessage)
  public async sendMessage(
    @Ctx() ctx: MyContext,
    @Arg('input', () => SendMessageInput) input: SendMessageInput,
  ): Promise<ChatMessage> {
    const userId = ctx.req.user.id;
    const chat = await getRepository(Chat).findOne({
      where: { id: input.chatId },
      relations: ['members', 'messages', 'members.avatar'],
    });

    if (!chat) throw Error('chat not found');
    if (!checkChatAccess(chat.members, userId)) {
      throw Error('youre not allowed to access this chat');
    }

    const result = await getManager().transaction(async (transactionManager) => {
      const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['avatar'] });
      const chatMessage = new ChatMessage(user, chat, input.message);
      chat.messages = [...chat.messages, chatMessage];
      chat.lastMessage = chatMessage;
      if (input.file) {
        const { filename, blurhash } = await uploadFileGraphql(input.file, 'images');
        const media = new Media();
        media.blurhash = blurhash;
        media.name = filename;
        media.type = MediaType.IMAGE;
        const savedMedia = await transactionManager.save(media);
        chatMessage.media = Promise.resolve(savedMedia);
      }

      const savedMessage = await transactionManager.save(chatMessage);

      const toUser = chat.members.find((member) => member.id !== userId);

      await ctx.req.pubsub.publish(SUB_TOPICS.NEW_CHAT_MESSAGE, { message: savedMessage, members: chat.members });

      return { savedMessage, user, toUser };
    });

    //send notification
    await notify(
      {
        fromUser: result.user,
        toUser: result.toUser,
        type: NotificationType.NEW_CHAT_MESSAGE,
        message: ' Neue Nachricht von ' + result.user.firstname,
        chat: chat,
        chatMessage: result.savedMessage,
      },
      ctx,
    );
    log.info(`'User with the id: ${userId} send a message'`);
    return result.savedMessage;
  }

  /**
   * Mutation, to create a new chat with someone
   */
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

  /**
   * Subscription to subscribe for new chat messages
   */
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
    payload.message.createdAt = new Date(payload.message.createdAt);
    return payload.message;
  }

  /**
   * Delete a chat message
   */
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
    const user = message.sendBy;
    if (user.id !== userId) throw Error('youre not allowed to delete this message');
    await getRepository(ChatMessage).remove(message);

    log.info(`'User with the id: ${userId} deleted a message'`);
    return true;
  }
}

/**
 * Helper function to check if an user is member of a chat
 */
const checkChatAccess = (members: User[], userId: string): boolean => {
  const user = members.find((member) => member.id === userId);
  if (user) return true;
  return false;
};
