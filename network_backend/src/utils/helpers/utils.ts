import { Token } from '../../entity/token.entity';
import { getRepository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { Role } from '../../entity/role.entity';

export enum OnlineStatus {
  ONLINE,
  OFFLINE,
}

/**
 * Updates the online Status of the user
 * @param userId id of the user
 * @param status online status of the user
 */
export const updateOnlineStatus = async (userId: string, status: OnlineStatus) => {
  const repo = getRepository(User);
  const user = await repo.findOne({ where: { id: userId } });

  if (user) {
    user.onlineStatus = status === OnlineStatus.ONLINE ? true : false;
    repo.save(user);
  }
};

/**
 * Activates the Account from a user with a token, send via email
 * @param token activation token
 */
export const activateAccount = async (token: string): Promise<void> => {
  const dbToken = await getRepository(Token).findOne({ where: { token: token } });

  if (!dbToken) throw new Error('activation token not valid');

  const user = await getRepository(User).findOne({ where: { id: dbToken.userId }, relations: ['roles'] });

  if (!dbToken) throw new Error('no associated user found');

  user.activated = true;

  const email = user.email;

  //assign role to user based on the used email, this is possbile of the nature of the email assignment
  //the role has no impact on the functionality of the platform, its just to display their role on the campus
  if (email.endsWith('@hs-hannover.de')) {
    const role = await getRepository(Role).findOne({ name: 'STUDENT' });
    user.roles.push(role);
  } else {
    const role = await getRepository(Role).findOne({ name: 'PROFESSOR' });
    user.roles.push(role);
  }

  await getRepository(User).save(user);
  await getRepository(Token).remove(dbToken);
};


//Helper functions to make some relational operations faster
export const queryWithRelations = async (
  id: string,
  repository: any,
  alias: string,
  relations: string[],
): Promise<any> => {
  return await Promise.all(
    relations.map((relation) => {
      const leftJoinAndSelect = getJoins(alias, relation);
      return repository.findOne(id, {
        loadEagerRelations: false,
        join: { alias, leftJoinAndSelect },
      });
    }),
  ).then(mergeObjects);
};

const getJoins = (base: any, relation: any) => {
  if (Array.isArray(relation)) {
    const parent = relation.shift();
    const children = relation.reduce((prev, current) => {
      return { ...prev, ...getJoins(parent, current) };
    }, {});
    return {
      [parent]: `${base}.${parent}`,
      ...children,
    };
  } else {
    return { [`${base}_${relation}`]: `${base}.${relation}` };
  }
};

const mergeObjects = (objects: any) => {
  return objects.reduce((prev, current) => {
    const props = Object.fromEntries(Object.entries(current).filter(([_, v]) => v !== undefined));
    return { ...prev, ...props };
  }, {});
};
