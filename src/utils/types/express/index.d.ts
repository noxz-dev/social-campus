import { JwtUser } from '../../interfaces/JwtUser';

declare module 'express' {
  interface Request {
    user?: JwtUser;
  }
}
