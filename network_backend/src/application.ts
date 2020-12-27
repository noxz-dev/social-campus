import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import expressPlayground from 'graphql-playground-middleware-express';
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
import { minioClient } from './utils/services/minio';

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
    this.host = express();

    // enable playground in dev
    if (process.env.NODE_ENV !== 'production') {
      this.host.get('/graphql', expressPlayground({ endpoint: '/graphql' }));
    }

    minioClient.bucketExists('profile-pics', function (err, exists) {
      if (err) {
        log.error(err.stack);
      }
      if (!exists) {
        minioClient.makeBucket('profile-pics', 'eu', (err) => {
          if (err) log.error(err.stack);
          console.log('Bucket created successfully in "eu".');
        });
      }
    });

    minioClient.bucketExists('post-images', function (err, exists) {
      if (err) {
        log.error(err.stack);
      }
      if (!exists) {
        minioClient.makeBucket('post-images', 'eu', (err) => {
          if (err) log.error(err.stack);
          console.log('Bucket created successfully in "eu".');
        });
      }
    });

    try {
      // enable cors
      this.host.use(
        cors({
          credentials: true,
          origin: '*',
        }),
      );

      // initialize schema
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [UserResolver, RoleResolver, PostResolver, CommentResolver, GroupResolver],
        authChecker: customAuthChecker,
      });

      // add graphql route and middleware
      this.host.post(
        '/graphql',
        authenticateToken,
        bodyParser.json(),
        graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
        graphqlHTTP((req, res) => ({
          schema,
          context: { req, res } as MyContext,
          customFormatErrorFn: (error) => {
            throw error;
          },
        })),
      );

      // error middlware
      this.host.use(
        (
          error: Error,
          req: express.Request,
          res: express.Response,
          next: express.NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
        ): void => {
          // console.error('🚨  Something went wrong', error);
          log.error(`something went wrong: ${error.stack}`);
          res.status(400).send(error);
        },
      );

      // start server on default port 4000
      const port = process.env.PORT || 5000;
      this.server = this.host.listen(port, () => {
        log.info(`🚀  http://localhost:${port}/graphql`);
      });
    } catch (error) {
      console.error('🚨  Could not start server', error);
    }
  };
}
