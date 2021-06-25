/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/helpers/auth';
import { log } from '../utils/services/logger';
import { redis } from '../utils/services/redis';

/**
 * Authentication Middleware, verify the jwt token
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.hasOwnProperty('authorization')) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const result = await redis.lrange('token', 0, 99999999);
    if (result.indexOf(token) > -1) {
      log.info('this token is blacklisted');
      //TODO ACITVATE KICK OUT
    }

    if (token) {
      const user = verifyAccessToken(token);
      if (user) {
        req.user = user;
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
};
