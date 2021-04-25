import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository, In, Not } from 'typeorm';
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

    const saved = await getRepository(Group).save(group);
    const groupRole = new GroupMemberRole();
    groupRole.group = saved;
    groupRole.user = user;
    groupRole.role = GroupRole.ADMIN;
    await getRepository(GroupMemberRole).save(groupRole);
    return saved;
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
      const groupRole = new GroupMemberRole();
      groupRole.group = group;
      groupRole.user = user;
      groupRole.role = GroupRole.MEMBER;
      await getRepository(GroupMemberRole).save(groupRole);
      const saved = await getRepository(Group).save(group);
      return saved;
    } else if (group.type === GroupType.PUBLIC) {
      group.members.push(user as GroupMember);
      const groupRole = new GroupMemberRole();
      groupRole.group = group;
      groupRole.user = user;
      groupRole.role = GroupRole.MEMBER;
      await getRepository(GroupMemberRole).save(groupRole);
      const saved = await getRepository(Group).save(group);
      return saved;
    }
    throw Error('could not join the group');
  }

  @Authorized()
  @Query(() => Group)
  public async groupById(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<Group> {
    const userId = ctx.req.user.id;
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members', 'createdBy'] });
    if (!group) {
      throw new Error('group not found');
    }
    group.numberOfMembers = group.members.length;
    group.numberOfPosts = await getRepository(Post).count({ where: { group: groupId } });
    group.members = await getGroupMembersWithRoles(group.id);
    return group;
  }

  @Authorized()
  @Query(() => [Group])
  public async groups(@Ctx() ctx: MyContext, @Arg('skip') skip: number, @Arg('take') take: number): Promise<Group[]> {
    const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({
      where: {
        id: userId,
      },
      relations: ['groups'],
    });

    const ids = user.groups.map((g) => g.id);
    let groups = await getRepository(Group).find({
      where: {
        id: Not(In(ids)),
      },
      skip,
      take,
      relations: ['members', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
    if (!groups) {
      return [];
    }

    groups = groups.map((g) => {
      g.numberOfMembers = g.members.length;
      return g;
    });

    for await (const group of groups) {
      group.members = await getGroupMembersWithRoles(group.id);
    }

    return groups;
  }

  @Authorized()
  @Query(() => [Group])
  public async myGroups(@Ctx() ctx: MyContext): Promise<Group[]> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({
      where: { id: userId },
      relations: ['groups', 'groups.members', 'groups.createdBy'],
    });
    if (!user.groups) {
      return [];
    }

    user.groups = user.groups.map((g) => {
      g.numberOfMembers = g.members.length;
      return g;
    });

    for await (const group of user.groups) {
      group.members = await getGroupMembersWithRoles(group.id);
    }

    return user.groups;
  }

  @Authorized()
  @Mutation(() => Group)
  public async updateGroupRole(
    @Ctx() ctx: MyContext,
    @Arg('memberId') memberId: string,
    @Arg('groupId') groupId: string,
    @Arg('groupRole', () => GroupRole) groupRole: GroupRole,
  ): Promise<Group> {
    const userId = ctx.req.user.id;
    const loggedInRole = await getRepository(GroupMemberRole).findOne({ where: { user: userId } });
    console.log(loggedInRole);
    if (loggedInRole.role !== GroupRole.ADMIN) throw new Error('youre not allowed to do this');

    const user = await getRepository(User).findOne({ where: { id: memberId } });

    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });

    const role = await getRepository(GroupMemberRole).findOne({ where: { user: user } });

    role.role = groupRole;

    await getRepository(GroupMemberRole).save(role);

    group.members = await getGroupMembersWithRoles(groupId);

    return group;
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

/**
 * helper function to count all member of a group
 * @param groupId string
 * @returns number
 */
export const countMembers = async (groupId: string): Promise<number> => {
  const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });
  if (!group) return 0;
  return group.members.length;
};

export const getGroupMembersWithRoles = async (groupId: string): Promise<GroupMember[]> => {
  const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });
  const roles = await getRepository(GroupMemberRole).find({ where: { group: group }, relations: ['user'] });
  group.members = group.members.map((member) => {
    member.groupRole = roles.find((role) => role.user.id === member.id).role;
    return member;
  });

  return group.members;
};
