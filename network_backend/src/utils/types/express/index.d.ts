import { PubSub } from 'apollo-server-express';
import { JwtUser } from '../../interfaces/jwtUser.interface';

declare module 'express' {
  interface Request {
    user?: JwtUser;
    pubsub?: PubSub;
  }
}
