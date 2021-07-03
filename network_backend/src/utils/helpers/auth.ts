// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jwt from 'jsonwebtoken';
import { JwtUser } from '../interfaces/interfaces';
import { log } from '../services/logger';

/**
 * Generate a JWT AccessToken for authentication purposes
 */
export const generateAccessToken = (user: JwtUser): string => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

/**
 * Verify the signature of an AccessToken
 */
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
