import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JwtUser } from '../../interfaces/interfaces';

declare module 'express' {
  interface Request {
    user?: JwtUser;
    pubsub?: RedisPubSub;
  }
}
