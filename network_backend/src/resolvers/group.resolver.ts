import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository, In, Not } from 'typeorm';
import { Group, GroupType } from '../entity/group.entity';
import { GroupMemberRole, GroupRole } from '../entity/groupMemberRole.entity';
import { Post } from '../entity/post.entity';
import { GroupMember, User } from '../entity/user.entity';
import { GroupAccess } from '../graphql_types/groupAccess';
import { GroupRoleAccess } from '../graphql_types/groupRoleAccess';
import { MyContext } from '../utils/interfaces/context.interface';

@Resolver(() => Group)
export class GroupResolver {
  @Authorized()
  @Mutation(() => Group)
  public async createGroup(
    @Ctx() ctx: MyContext,
    @Arg('name', () => String) name: string,
    @Arg('description', () => String, { nullable: true }) description: string,
    @Arg('groupType', () => GroupType) groupType: GroupType,
    @Arg('password', () => String, { nullable: true }) password: string,
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
    @Arg('groupId', () => String) groupId: string,
    @Arg('password', () => String, { nullable: true }) password: string,
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
  public async groupById(@Ctx() ctx: MyContext, @Arg('groupId', () => String) groupId: string): Promise<Group> {
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
  @Mutation(() => Group)
  public async updateAboutGroup(
    @Ctx() ctx: MyContext,
    @Arg('groupId', () => String) groupId: string,
    @Arg('aboutContent', () => String) aboutContent: string,
  ): Promise<Group> {
    const userId = ctx.req.user.id;
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members', 'createdBy'] });
    if (!group) {
      throw new Error('group not found');
    }
    group.numberOfMembers = group.members.length;
    group.numberOfPosts = await getRepository(Post).count({ where: { group: groupId } });
    group.members = await getGroupMembersWithRoles(group.id);

    group.about = aboutContent;
    await getRepository(Group).save(group);
    return group;
  }

  @Authorized()
  @Query(() => [Group])
  public async groups(
    @Ctx() ctx: MyContext,
    @Arg('skip', () => Number) skip: number,
    @Arg('take', () => Number) take: number,
  ): Promise<Group[]> {
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
      relations: ['groups', 'groups.members', 'groups.createdBy', 'groups.posts'],
    });
    if (!user.groups) {
      return [];
    }

    for await (const group of user.groups) {
      group.members = await getGroupMembersWithRoles(group.id);
      group.posts = await getRepository(Post).find({ where: { group: group.id } });
    }
    user.groups = user.groups.map((g) => {
      g.numberOfMembers = g.members.length;
      return g;
    });

    //sort groups after post activity
    user.groups.sort((a, b) => {
      a.posts.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

      b.posts.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

      if (!a.posts[0] && b.posts[0]) {
        return new Date(b.posts[0].createdAt).getTime() - 0;
      }

      if (!b.posts[0] && a.posts[0]) {
        return 0 - new Date(a.posts[0].createdAt).getTime();
      }

      if (!b.posts[0] && !a.posts[0]) {
        return 0 - 0;
      }

      return new Date(b.posts[0].createdAt).getTime() - new Date(a.posts[0].createdAt).getTime();
    });

    return user.groups;
  }

  @Authorized()
  @Query(() => [Group])
  public async followingGroups(@Ctx() ctx: MyContext): Promise<Group[]> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({
      where: { id: userId },
      relations: ['following', 'following.groups'],
    });

    if (!user) {
      return [];
    }

    let groups: Group[] = [];

    for (const following of user.following) {
      groups.push(...following.groups);
    }

    groups = groups.filter((group, i, arr) => arr.findIndex((t) => t.id === group.id) === i);

    for await (const group of groups) {
      group.members = await getGroupMembersWithRoles(group.id);
    }

    groups = groups.map((g) => {
      g.numberOfMembers = g.members.length;
      return g;
    });

    return groups;
  }

  @Authorized()
  @Mutation(() => Group)
  public async updateGroupRole(
    @Ctx() ctx: MyContext,
    @Arg('memberId', () => String) memberId: string,
    @Arg('groupId', () => String) groupId: string,
    @Arg('groupRole', () => GroupRole) groupRole: GroupRole,
  ): Promise<Group> {
    const userId = ctx.req.user.id;
    const loggedInRole = await getRepository(GroupMemberRole).findOne({ where: { user: userId, group: groupId } });
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
  @Query(() => GroupAccess)
  public async checkGroupAccess(
    @Ctx() ctx: MyContext,
    @Arg('groupId', () => String) groupId: string,
  ): Promise<GroupAccess> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['groups'] });

    const found = user.groups.find((grp) => grp.id === groupId);
    const state = new GroupAccess();
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

  @Authorized()
  @Query(() => GroupRoleAccess)
  public async checkGroupRoleAccess(
    @Ctx() ctx: MyContext,
    @Arg('groupId', () => String) groupId: string,
    @Arg('groupRole', () => GroupRole) role: string,
  ): Promise<GroupRoleAccess> {
    const userId = ctx.req.user.id;

    const members = await getGroupMembersWithRoles(groupId);

    const user = members.find((m) => m.id === userId);

    if (!user) throw new Error('User is not part of this group!');

    if (user.groupRole === role) {
      return { isAllowed: true };
    }

    return { isAllowed: false };
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

/**
 * helper function to get all members of a group with their roles
 * @param groupId string
 * @returns number
 */
export const getGroupMembersWithRoles = async (groupId: string): Promise<GroupMember[]> => {
  const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });

  if (!group) throw new Error('Group not found');

  const roles = await getRepository(GroupMemberRole).find({ where: { group: group }, relations: ['user'] });
  group.members = group.members.map((member) => {
    member.groupRole = roles.find((role) => role.user.id === member.id).role;
    return member;
  });

  return group.members;
};

export const isMemberOfGroup = async (groupId: string, userId: string): Promise<boolean> => {
  const isMemberOfGroup = await getRepository(Group)
    .createQueryBuilder('group')
    .leftJoinAndSelect('group.members', 'members')
    .where('group.id = :groupId', { groupId: groupId })
    .andWhere('members.id = :userId', { userId: userId })
    .getCount();

  console.log(Boolean(isMemberOfGroup));

  return;
};
