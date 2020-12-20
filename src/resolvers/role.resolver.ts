import { Resolver, Query, Ctx, Arg, Mutation, Authorized, Info } from 'type-graphql';

import { MyContext } from '../utils/interfaces/context.interface';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';
import { getRepository } from 'typeorm';
import { RoleValidator } from "../validators/role.validator"

@Resolver(() => Role)
export class RoleResolver {
  @Authorized('ADMIN')
  @Query(() => [Role])
  public async getRoles(@Ctx() ctx: MyContext): Promise<Role[]> {
    return await getRepository(Role).find();
  }

  @Authorized()
  @Mutation(() => Role)
  public async addRole(@Arg('input') input: RoleValidator, @Ctx() ctx: MyContext): Promise<Role> {
    const role = new Role(input);
    await getRepository(Role).save(role)
    return role;
  }

  @Authorized()
  @Mutation(() => Boolean)
  public async removeRole(@Arg('name') name: string, @Ctx() ctx: MyContext): Promise<boolean> {
    const role = await getRepository(Role).findOne({ name });
    try {
      await getRepository(Role).remove(role)
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
    return true;
  }

  @Authorized()
  @Mutation(() => User)
  public async assignRoleToUser(
    @Arg('roleName') roleName: string,
    @Arg('email') email: string,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const role = await getRepository(Role).findOne({ name: roleName });
    if (!role) throw new Error('Role not found!');
    const user = await getRepository(User).findOne({relations: ["roles"], where:{ email }});
    if (!user) throw new Error('User not found!');
    user.roles.push(role);
    await getRepository(User).save(user);
    return user;
  }

  @Authorized()
  @Mutation(() => User)
  public async removeRoleFromUser(
    @Arg('roleName') roleName: string,
    @Arg('email') email: string,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const role = await getRepository(Role).findOne({ name: roleName });
    if (!role) throw new Error('Role not found!');
    const user = await getRepository(User).findOne({relations: ["roles"], where:{ email }});
    if (!user) throw new Error('User not found!');
    user.roles = user.roles.filter(r => {
      r.id !== role.id
  })
    await getRepository(User).save(user)
    return user;
  }
}
