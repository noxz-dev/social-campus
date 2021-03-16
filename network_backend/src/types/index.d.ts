import { PubSub } from 'apollo-server-express';

declare module 'express-serve-static-core' {
  interface Request {
    pubsub?: PubSub;
  }
}
