/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/helpers/auth';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.hasOwnProperty('authorization')) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
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
