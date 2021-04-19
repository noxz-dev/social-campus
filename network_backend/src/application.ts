import { ApolloServer, PubSub } from 'apollo-server-express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { GraphQLSchema } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import http, { Server } from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import '../ormconfig';
import {
  ChatResolver,
  CommentResolver,
  GroupResolver,
  NotificationResolver,
  PostResolver,
  RoleResolver,
  SearchResolver,
  TagResolver,
  UserResolver,
} from './resolvers';
import { verifyAccessToken } from './utils/helpers/auth';
import { customAuthChecker } from './utils/helpers/authChecker';
import { MyContext } from './utils/interfaces/context.interface';
import { authenticateToken } from './utils/middlewares/auth';
import { log } from './utils/services/logger';
import { initS3 } from './utils/services/minio';

export class Application {
  public host: express.Application;
  public server: Server;
  public pubsub: PubSub;

  public connect = async (): Promise<void> => {
    try {
      const connection = await createConnection();
      await connection.synchronize();
    } catch (error) {
      console.error('🚨  Could not connect to the database', error);
      throw Error(error);
    }
  };

  // initialize express
  public init = async (): Promise<void> => {
    const app = express();
    this.pubsub = new PubSub();

    initS3();

    try {
      // initialize schema and register resolvers
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [
          UserResolver,
          RoleResolver,
          PostResolver,
          CommentResolver,
          NotificationResolver,
          SearchResolver,
          TagResolver,
          ChatResolver,
          GroupResolver,
        ],
        pubSub: this.pubsub,
        authChecker: customAuthChecker,
      });

      //initialize graphql server
      const server = new ApolloServer({
        schema,
        subscriptions: {
          onConnect(connectionParams: { campusToken: string }) {
            if (connectionParams.campusToken) {
              const user = verifyAccessToken(connectionParams.campusToken);
              log.info('✨ user connected to the subscriptions server');
              return {
                user,
              };
            }
            throw new Error('Missing auth token!');
          },
        },
        context: ({ req, res, connection }) => {
          if (!req || !req.headers) {
            return connection.context;
          }
          const context: MyContext = {
            req,
            res,
          };
          return context;
        },
        uploads: false,
        formatError: (error) => {
          log.error('GRAPHQL ERROR', JSON.stringify(error));
          // console.log(error.extensions.exception.stacktrace);
          const response = { message: error.message };
          return response;
        },
      });

      // error middlware
      app.use(
        (
          error: Error,
          _req: express.Request,
          res: express.Response,
          _next: express.NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
        ): void => {
          log.error(`something went wrong: ${error.stack}`);
          res.status(400).send(error);
        },
      );

      app.use(cors());
      //authentication middleware
      app.use(authenticateToken);
      app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

      app.use((req: express.Request, _res: express.Response, next: express.NextFunction): void => {
        req.pubsub = this.pubsub;
        next();
      });
      server.applyMiddleware({ app });

      // start server on default port 4000
      const port = process.env.PORT || 5000;

      const httpServer = http.createServer(app);
      server.installSubscriptionHandlers(httpServer);

      httpServer.listen(port, () => {
        log.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
        log.info(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
      });
    } catch (error) {
      console.error('🚨  Could not start server', error);
    }
  };
}
