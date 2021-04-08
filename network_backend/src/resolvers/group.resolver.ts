import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Group, GroupType } from '../entity/group.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';

@Resolver(() => Group)
export class GroupResolver {
  @Authorized()
  @Mutation(() => Group)
  public async createGroup(
    @Ctx() ctx: MyContext,
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('groupType', () => GroupType) groupType: GroupType,
  ): Promise<Group | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    const group = new Group();
    group.members = [];
    group.createdBy = user;
    group.name = name;
    group.type = groupType;
    if (description) group.description = description;
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

    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });
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
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });
    if (!group) {
      throw new Error('group not found');
    }
    return group;
  }

  @Authorized()
  @Query(() => [Group])
  public async groups(@Arg('skip') skip: number, @Arg('take') take: number): Promise<Group[]> {
    const groups = await getRepository(Group).find({ skip, take, relations: ['members'] });
    if (!groups) {
      return [];
    }
    return groups;
  }
}
