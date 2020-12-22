import jwt from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtUser } from '../interfaces/JwtUser';

export const generateAccessToken = (user: JwtUser): string => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

export const generateRefreshToken = (user: JwtUser): string => {
  return jwt.sign(user, process.env.JWT_REFRESH);
};
