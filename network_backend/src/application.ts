import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { GraphQLSchema } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { Server } from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';
import { CommentResolver } from './resolvers/comment.resolver';
import { GroupResolver } from './resolvers/group.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { customAuthChecker } from './utils/helpers/authChecker';
import { MyContext } from './utils/interfaces/context.interface';
import { authenticateToken } from './utils/middlewares/auth';
import { log } from './utils/services/logger';
import { initS3 } from './utils/services/minio';

export class Application {
  public host: express.Application;
  public server: Server;

  public connect = async (): Promise<void> => {
    try {
      const connection: Connection = await createConnection();
    } catch (error) {
      console.error('🚨  Could not connect to the database', error);
      throw Error(error);
    }
  };

  // initialize express
  public init = async (): Promise<void> => {
    const app = express();

    initS3();

    try {
      // enable cors
      // this.host.use(
      //   cors({
      //     credentials: true,
      //     origin: '*',
      //   }),
      // );

      // initialize schema
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [UserResolver, RoleResolver, PostResolver, CommentResolver, GroupResolver],
        authChecker: customAuthChecker,
      });

      //initialize graphql server
      const server = new ApolloServer({
        schema,
        subscriptions: { path: '/subscriptions' },
        context: ({ req, res }) => {
          const context: MyContext = {
            req,
            res,
          };
          return context;
        },
        formatError: (error) => {
          throw error;
        },
        uploads: false,
      });

      // error middlware
      app.use(
        (
          error: Error,
          req: express.Request,
          res: express.Response,
          next: express.NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
        ): void => {
          log.error(`something went wrong: ${error.stack}`);
          res.status(400).send(error);
        },
      );

      //authentication middleware
      app.use(authenticateToken);
      app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

      server.applyMiddleware({ app });

      // start server on default port 4000
      const port = process.env.PORT || 5000;

      this.server = app.listen(port, () => {
        log.info(`🚀  http://localhost:${port}${server.graphqlPath}`);
      });
    } catch (error) {
      console.error('🚨  Could not start server', error);
    }
  };
}
