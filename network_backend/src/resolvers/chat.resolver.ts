import { Chat } from '../entity/chat.entity';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository, In } from 'typeorm';
import { Group, GroupType } from '../entity/group.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';

@Resolver(() => Chat)
export class ChatResolver {
  @Authorized()
  @Query(() => [Chat])
  public async myChats(@Ctx() ctx: MyContext): Promise<Chat[]> {
    const userId = ctx.req.user.id;
    // const user = await getRepository(User).findOne({ where: { id: userId } });
    // const chat = new Chat();
    // chat.members = [];
    // chat.members.push(user);
    // await getRepository(Chat).save(chat);
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['chats'] });
    if (!user.chats) return [];
    return user.chats;
  }
}
