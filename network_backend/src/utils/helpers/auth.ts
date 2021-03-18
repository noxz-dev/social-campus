// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jwt from 'jsonwebtoken';
import { JwtUser } from '../interfaces/jwtUser.interface';

export const generateAccessToken = (user: JwtUser): string => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

export const generateRefreshToken = (user: JwtUser): string => {
  return jwt.sign(user, process.env.JWT_REFRESH);
};
