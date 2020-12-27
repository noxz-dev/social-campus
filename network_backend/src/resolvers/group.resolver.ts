import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Group } from '../entity/group.entity';
import { User } from '../entity/user.entity';
import { MyContext } from '../utils/interfaces/context.interface';

@Resolver(() => Group)
export class GroupResolver {
  @Authorized()
  @Mutation(() => Group)
  public async createGroup(@Ctx() ctx: MyContext): Promise<Group | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: ctx.req.user.id } });
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
  public async joinGroup(@Ctx() ctx: MyContext, @Arg('groupID') groupID: string): Promise<Group | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: ctx.req.user.id } });
    if (!user) {
      return null;
    }

    const group = await getRepository(Group).findOne({ where: { id: groupID }, relations: ['user'] });
    if (!group) {
      return null;
    }

    group.members.push(user);
    await getRepository(Group).save(group);
    return group;
  }
}
