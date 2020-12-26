/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { log } from '../services/logger';
import { JwtUser } from '../utils/interfaces/jwtUser';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.hasOwnProperty('authorization')) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: JwtUser) => {
      if (err) {
        log.info('jwt token expired');
        throw err;
      }
      req.user = user;
      next();
    });
  } else {
    next();
  }
};
