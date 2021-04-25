import { getRepository } from 'typeorm';
import { User } from '../../entity/user.entity';

export enum OnlineStatus {
  ONLINE,
  OFFLINE,
}

export const updateOnlineStatus = async (userId: string, status: OnlineStatus) => {
  const repo = getRepository(User);
  const user = await repo.findOne({ where: { id: userId } });

  if (user) {
    user.onlineStatus = status === OnlineStatus.ONLINE ? true : false;
    repo.save(user);
  }
};
