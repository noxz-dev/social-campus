/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtUser } from 'utils/interfaces/JwtUser';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.hasOwnProperty('authorization')) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: JwtUser) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
      });
    }
  }
  next();
};
