/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtUser } from '../utils/interfaces/jwtUser.interface';
import { log } from '../utils/services/logger';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.hasOwnProperty('authorization')) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: JwtUser) => {
        if (err) {
          log.info('jwt token expired');
          log.error(err.stack);
        }
        req.user = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
