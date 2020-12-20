/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthChecker } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { MyContext } from '../interfaces/context.interface';

export const customAuthChecker: AuthChecker<MyContext> = async ({ context, info }, roles): Promise<boolean> => {
  if (!context.req.user) return null;
  const userId = context.req.user.id;
  if (!userId) return null;
  const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['roles'] });

  if (!user) {
    return null;
  }

  if (roles.length === 0) {
    return !!user;
  }

  const userRoles = user.roles.map((role) => role.name);
  if (userRoles.some((role) => roles.includes(role))) {
    return true;
  }

  return false;
};
