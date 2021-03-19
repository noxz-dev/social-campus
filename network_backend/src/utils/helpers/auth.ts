// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jwt from 'jsonwebtoken';
import { JwtUser } from '../interfaces/jwtUser.interface';
import { log } from '../services/logger';

export const generateAccessToken = (user: JwtUser): string => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

export const generateRefreshToken = (user: JwtUser): string => {
  return jwt.sign(user, process.env.JWT_REFRESH);
};

export const verifyAccessToken = (token: string): JwtUser | void => {
  return jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: JwtUser) => {
    if (err) {
      log.info('jwt token expired');
      log.error(err.stack);
      throw new Error('JWT ERROR');
    }
    return user;
  });
};
