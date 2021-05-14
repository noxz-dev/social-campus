import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JwtUser } from '../../interfaces/jwtUser.interface';

declare module 'express' {
  interface Request {
    user?: JwtUser;
    pubsub?: RedisPubSub;
  }
}
