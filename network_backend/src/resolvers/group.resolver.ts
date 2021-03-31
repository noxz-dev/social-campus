import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Group } from '../entity/group.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';

@Resolver(() => Group)
export class GroupResolver {
  @Authorized()
  @Mutation(() => Group)
  public async createGroup(@Ctx() ctx: MyContext): Promise<Group | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    const group = new Group();
    group.members.push(user);

    await getRepository(Group).save(group);
    return group;
  }

  @Authorized()
  @Mutation(() => Group)
  public async joinGroup(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<Group | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('user not found');
    }

    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['user'] });
    if (!group) {
      throw new Error('group not found');
    }

    group.members.push(user);
    await getRepository(Group).save(group);
    return group;
  }

  @Authorized()
  @Query(() => Group)
  public async groupById(@Arg('groupId') groupId: string): Promise<Group> {
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['user'] });
    if (!group) {
      throw new Error('group not found');
    }
    return group;
  }
}
