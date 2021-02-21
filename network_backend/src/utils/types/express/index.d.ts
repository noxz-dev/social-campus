import { JwtUser } from '../../interfaces/jwtUser';

declare module 'express' {
  interface Request {
    user?: JwtUser;
  }
}
