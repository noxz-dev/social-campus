import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';
import { RoleValidator } from '../validators/role.validator';

@Resolver(() => Role)
export class RoleResolver {
  @Authorized('ADMIN')
  @Query(() => [Role])
  public async getRoles(): Promise<Role[]> {
    return await getRepository(Role).find();
  }

  @Authorized('ADMIN')
  @Mutation(() => Role)
  public async addRole(@Arg('input', () => RoleValidator) input: RoleValidator): Promise<Role> {
    const role = new Role(input);
    await getRepository(Role).save(role);
    return role;
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  public async removeRole(@Arg('name', () => String) name: string): Promise<boolean> {
    const role = await getRepository(Role).findOne({ name });
    try {
      await getRepository(Role).remove(role);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
    return true;
  }

  @Authorized()
  @Mutation(() => User)
  public async assignRoleToUser(
    @Arg('roleName', () => String) roleName: string,
    @Arg('email', () => String) email: string,
  ): Promise<User | null> {
    //disable the ability to assign the admin group via this call
    if (roleName.toLocaleLowerCase() === 'admin') throw new Error('youre not allowed to do this');

    const role = await getRepository(Role).findOne({ name: roleName });
    if (!role) throw new Error('Role not found!');
    const user = await getRepository(User).findOne({ relations: ['roles'], where: { email } });
    if (!user) throw new Error('User not found!');

    user.roles.push(role);
    await getRepository(User).save(user);
    return user;
  }

  @Authorized()
  @Mutation(() => User)
  public async removeRoleFromUser(
    @Arg('roleName', () => String) roleName: string,
    @Arg('email', () => String) email: string,
  ): Promise<User | null> {
    const role = await getRepository(Role).findOne({ name: roleName });
    if (!role) throw new Error('Role not found!');
    const user = await getRepository(User).findOne({ relations: ['roles'], where: { email } });
    if (!user) throw new Error('User not found!');
    user.roles = user.roles.filter((r) => {
      r.id !== role.id;
    });
    await getRepository(User).save(user);
    return user;
  }
}
