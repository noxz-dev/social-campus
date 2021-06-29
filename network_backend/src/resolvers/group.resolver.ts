import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getManager, getRepository, In, Not } from 'typeorm';
import { Group, GroupType } from '../entity/group.entity';
import { GroupMemberRole, GroupRole } from '../entity/groupMemberRole.entity';
import { Post } from '../entity/post.entity';
import { GroupMember, User } from '../entity/user.entity';
import { GroupAccess } from '../graphql_types/groupAccess';
import { GroupRoleAccess } from '../graphql_types/groupRoleAccess';
import { PreviewGroup } from '../graphql_types/previewGroup';
import { MyContext } from '../utils/interfaces/interfaces';
import { UpdateGroupInput } from '../validators/updateGroup.validator';

@Resolver(() => Group)
export class GroupResolver {
  /**
   * Mutation to create a new group
   */
  @Authorized()
  @Mutation(() => PreviewGroup)
  public async createGroup(
    @Ctx() ctx: MyContext,
    @Arg('name', () => String) name: string,
    @Arg('description', () => String, { nullable: true }) description: string,
    @Arg('groupType', () => GroupType) groupType: GroupType,
    @Arg('password', () => String, { nullable: true }) password: string,
  ): Promise<PreviewGroup> {
    //TODO USE A INPUT
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('user not authenticated');

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) throw new Error('user not found');

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

    return new PreviewGroup(group);
  }

  /**
   * Mutation to join a new group
   */
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

  /**
   * Query to get a group by a given id
   */
  @Authorized()
  @Query(() => Group)
  public async groupById(@Ctx() ctx: MyContext, @Arg('groupId', () => String) groupId: string): Promise<Group> {
    const userId = ctx.req.user.id;

    if (!(await isMemberOfGroup(groupId, userId))) throw new Error('youre not allowed to access this');
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members', 'createdBy'] });
    if (!group) {
      throw new Error('group not found');
    }
    group.numberOfMembers = group.members.length;
    group.numberOfPosts = await getRepository(Post).count({ where: { group: groupId } });
    group.members = await getGroupMembersWithRoles(group.id);
    return group;
  }

  /**
   * Query to get a preview of a group
   */
  @Authorized()
  @Query(() => PreviewGroup)
  public async groupByIdPreview(@Arg('groupId', () => String) groupId: string): Promise<PreviewGroup> {
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members', 'createdBy'] });
    if (!group) {
      throw new Error('group not found');
    }
    group.numberOfMembers = group.members.length;
    group.numberOfPosts = await getRepository(Post).count({ where: { group: groupId } });
    group.members = await getGroupMembersWithRoles(group.id);

    const previewGroup = new PreviewGroup(group);
    return previewGroup;
  }

  /**
   * Mutation to update the information of the group
   */
  @Authorized()
  @Mutation(() => Group)
  public async updateAboutGroup(
    @Ctx() ctx: MyContext,
    @Arg('groupId', () => String) groupId: string,
    @Arg('aboutContent', () => String) aboutContent: string,
  ): Promise<Group> {
    //TODO NEEDS IS ALLOWED VALIDATION -> only if admin
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

  /**
   * get a preview of all exisiting groups
   */
  @Authorized()
  @Query(() => [PreviewGroup])
  public async groups(
    @Ctx() ctx: MyContext,
    @Arg('offset', () => Number) offset: number,
    @Arg('limit', () => Number) limit: number,
  ): Promise<PreviewGroup[]> {
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
      skip: offset,
      take: limit,
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

    const previewGroups = groups.map((group) => new PreviewGroup(group));

    return previewGroups;
  }

  /**
   * get a preview of all groups, where the logged in user is a member
   */
  @Authorized()
  @Query(() => [PreviewGroup])
  public async myGroups(
    @Ctx() ctx: MyContext,
    @Arg('offset', () => Number) offset: number,
    @Arg('limit', () => Number) limit: number,
  ): Promise<PreviewGroup[]> {
    const userId = ctx.req.user.id;

    //some magic to get all relevant groups and sort by last interaction
    const groups = (await getManager().query(
      `SELECT  "group".*
      from (SELECT * FROM group_members_user WHERE "userId" = $1) AS groupuser 
      JOIN  "group" ON (groupuser."groupId" =  "group"."id")
      LEFT JOIN (SELECT "post"."groupId", MAX("post"."updated_at") AS updated_at FROM "post" WHERE "post"."groupId" IS NOT NULL GROUP BY "post"."groupId") as newposts 
      ON "groupuser"."groupId" = "newposts"."groupId" 
      ORDER BY greatest("newposts".updated_at, "group".updated_at) DESC 
      LIMIT ${limit} 
      OFFSET ${offset};`,
      [userId],
    )) as Group[];

    for await (const group of groups) {
      group.members = await getGroupMembersWithRoles(group.id);
    }

    const updatedGroups = groups.map((g) => {
      g.numberOfMembers = g.members.length;
      return g;
    });

    const previewGroups = updatedGroups.map((group) => new PreviewGroup(group));
    return previewGroups;
  }

  /**
   * get a preview of all groups where a person is member who is followed by the logged in user
   */
  @Authorized()
  @Query(() => [PreviewGroup])
  public async followingGroups(
    @Ctx() ctx: MyContext,
    @Arg('offset', () => Number) offset: number,
    @Arg('limit', () => Number) limit: number,
  ): Promise<PreviewGroup[]> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({
      where: { id: userId },
      relations: ['following'],
    });

    if (!user) {
      return [];
    }

    const followingIds = user.following.map((u) => u.id);

    if (followingIds.length === 0) return [];

    const stringIds = [];

    for (const id of followingIds) {
      stringIds.push("'" + id + "'");
    }

    const parsed = stringIds.toString().replace('[', '').replace(']', '');

    //get all groups from the followers
    let groups = (await getManager().query(
      `SELECT "group".* FROM "group" 
      JOIN (SELECT "groupId" FROM "group_members_user" WHERE "userId" IN(${parsed}) AND "groupId" NOT IN (SELECT DISTINCT "groupId" FROM "group_members_user" WHERE "userId" = '${userId}')) as notmember 
      ON "group"."id" = "notmember"."groupId" ORDER BY "group".updated_at DESC LIMIT ${limit} OFFSET ${offset};`,
    )) as Group[];

    for await (const group of groups) {
      group.members = await getGroupMembersWithRoles(group.id);
    }

    groups = groups.map((g) => {
      g.numberOfMembers = g.members.length;
      return g;
    });

    const previewGroups = groups.map((group) => new PreviewGroup(group));
    return previewGroups;
  }

  /**
   * Update the Role of user within a group
   */
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

    //find the member, where the role should be updated
    const user = await getRepository(User).findOne({ where: { id: memberId } });

    if (!user) throw new Error('User not found');

    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });

    if (!group) throw new Error('Group not found');

    //find the active role from the member in the group
    const role = await getRepository(GroupMemberRole).findOne({ where: { user: user, group: groupId } });

    if (!role) throw new Error('Group Role not found');

    //set the new group
    role.role = groupRole;

    await getRepository(GroupMemberRole).save(role);

    group.members = await getGroupMembersWithRoles(groupId);

    return group;
  }

  /**
   * Check if youre allowed to interact with the content of a group
   */
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

  /**
   * Mutation to update group information
   */
  @Authorized()
  @Mutation(() => Group)
  public async updateGroup(
    @Ctx() ctx: MyContext,
    @Arg('input', () => UpdateGroupInput) input: UpdateGroupInput,
  ): Promise<Group> {
    const userId = ctx.req.user.id;

    //check the permissions
    const members = await getGroupMembersWithRoles(input.groupId);
    const user = members.find((member) => member.id === userId);
    if (!user) throw new Error('youre not a member of this group');

    if (user.groupRole !== GroupRole.ADMIN) throw new Error('youre not allowed to do this');

    const group = await getRepository(Group).findOne({ id: input.groupId });

    //set the new values
    group.name = input.name;
    group.description = input.description ?? group.description;
    group.password = input.password ?? group.password;
    group.type = input.type;
    if (input.type === GroupType.PUBLIC) {
      group.password = null;
    }

    const saved = await getRepository(Group).save(group);

    return saved;
  }

  /**
   * Mutation to leave a group
   */
  @Authorized()
  @Mutation(() => Boolean)
  public async leaveGroup(@Ctx() ctx: MyContext, @Arg('groupId', () => String) groupId: string): Promise<boolean> {
    const userId = ctx.req.user.id;

    //find the user who wants to leave the group
    const members = await getGroupMembersWithRoles(groupId);
    const user = members.find((member) => member.id === userId);
    if (!user) throw new Error('youre not a member of this group');

    //check if the user is the last admin
    if (user.groupRole === GroupRole.ADMIN) {
      //get all admins
      const admins = members.filter((m) => m.groupRole === GroupRole.ADMIN);

      //check if the user is not the last admin if there are more members
      if (admins.length === 1 && members.length > 1) throw new Error('youre not allowed to do this');
    }

    //TODO USE TRANSACTION
    const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members', 'memberRoles'] });
    if (!group) throw new Error('group not found');
    group.members = group.members.filter((member) => member.id !== userId);

    const memberRole = await getRepository(GroupMemberRole).findOne({ where: { user: userId, group: groupId } });
    await getRepository(GroupMemberRole).remove(memberRole);

    await getRepository(Group).save(group);

    //TODO DELETE GROUP IF THE USER WAS THE LAST MEMBER

    return true;
  }

  /**
   * check the role access to some information
   */
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
 * @returns Promise<number>
 */
export const countMembers = async (groupId: string): Promise<number> => {
  const group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });
  if (!group) return 0;
  return group.members.length;
};

/**
 * helper function to get all members of a group with their roles
 * @param groupId string
 * @returns Promise<GroupMember[]>
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

/**
 * helper function to check if the user is part of a given Group
 * @param groupId string
 * @param userId string
 * @returns boolean
 */
export const isMemberOfGroup = async (groupId: string, userId: string): Promise<boolean> => {
  const isMemberOfGroup = await getRepository(Group)
    .createQueryBuilder('group')
    .leftJoinAndSelect('group.members', 'members')
    .where('group.id = :groupId', { groupId: groupId })
    .andWhere('members.id = :userId', { userId: userId })
    .getCount();

  return Boolean(isMemberOfGroup);
};
