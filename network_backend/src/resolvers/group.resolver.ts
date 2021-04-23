import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Group, GroupType } from '../entity/group.entity';
import { GroupMemberRole, GroupRole } from '../entity/groupMemberRole.entity';
import { Post } from '../entity/post.entity';
import { GroupMember, User } from '../entity/user.entity';
import { GroupState } from '../graphql_types/groupState';
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
    @Arg('password', { nullable: true }) password: string,
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
    if (groupType === GroupType.PRIVATE && password) group.password = password;
    if (description) group.description = description;
    group.members.push(user as GroupMember);

    await getRepository(Group).save(group);
    return group;
  }

  @Authorized()
  @Mutation(() => Group)
  public async joinGroup(
    @Ctx() ctx: MyContext,
    @Arg('groupId') groupId: string,
    @Arg('password', { nullable: true }) password: string,
  ): Promise<Group | null> {
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

    if (group.type === GroupType.PRIVATE && group.password === password) {
      group.members.push(user as GroupMember);
      await getRepository(Group).save(group);
      return group;
    } else if (group.type === GroupType.PUBLIC) {
      group.members.push(user as GroupMember);
      await getRepository(Group).save(group);
      return group;
    }
    throw Error('could not join the group');
  }

  @Authorized()
  @Query(() => Group)
  public async groupById(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<Group> {
    const userId = ctx.req.user.id;
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });
    if (!group) {
      throw new Error('group not found');
    }
    group.numberOfMembers = group.members.length;
    group.numberOfPosts = await getRepository(Post).count({ where: { group: groupId } });
    return group;
  }

  @Authorized()
  @Query(() => [Group])
  public async groups(@Arg('skip') skip: number, @Arg('take') take: number): Promise<Group[]> {
    const groups = await getRepository(Group).find({
      skip,
      take,
      relations: ['members'],
      order: { createdAt: 'DESC' },
    });
    if (!groups) {
      return [];
    }
    return groups;
  }

  @Authorized()
  @Query(() => [Group])
  public async myGroups(@Ctx() ctx: MyContext): Promise<Group[]> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({
      where: { id: userId },
      relations: ['groups', 'groups.members'],
    });
    if (!user.groups) {
      return [];
    }
    return user.groups;
  }

  @Authorized()
  @Query(() => Group)
  public async addGroupRole(@Ctx() ctx: MyContext, @Arg('userId') userId: string): Promise<Group> {
    // const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({ where: { id: userId } });

    const group = await getRepository(Group).findOne({ relations: ['members'] });

    const role = new GroupMemberRole();
    role.role = GroupRole.MEMBER;
    role.group = group;
    role.user = user;
    // for await (const user of users) {

    //   const saved = await getRepository(GroupMemberRole).save(role);
    //   roles.push(saved);
    // }

    // group.memberRoles = [...group.memberRoles, ...roles];

    const updatedGroup = await getRepository(Group).save(group);

    const roles = await getRepository(GroupMemberRole).find({ where: { group: group }, relations: ['user'] });

    updatedGroup.members = updatedGroup.members.map((member) => {
      member.groupRole = roles.find((role) => role.user.id === member.id).role;
      return member;
    });

    return updatedGroup;
  }

  @Authorized()
  @Query(() => GroupState)
  public async checkGroupAccess(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<GroupState> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['groups'] });

    const found = user.groups.find((grp) => grp.id === groupId);
    const state = new GroupState();
    if (found) {
      state.id = found.id;
      state.isMember = true;
      state.type = found.type;
    } else {
      const group = await getRepository(Group).findOne({ where: { id: groupId } });
      state.id = group.id;
      state.type = group.type;
      state.isMember = false;
    }

    return state;
  }
}
