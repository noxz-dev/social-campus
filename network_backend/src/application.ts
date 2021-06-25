import { ApolloServer } from 'apollo-server-express';
import { Base64Encode } from 'base64-stream';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { parse, stringify } from 'flatted';
import { GraphQLSchema } from 'graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';
import http, { Server } from 'http';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection, getRepository } from 'typeorm';
import { MyWebSocket } from 'utils/types/apollo';
import '../ormconfig';
import { Role } from './entity/role.entity';
import { authenticateToken } from './middlewares/auth';
import { customAuthChecker } from './middlewares/resolverAuthCheck';
import {
  ChatResolver,
  CommentResolver,
  GroupResolver,
  MediaResolver,
  NotificationResolver,
  PostResolver,
  RoleResolver,
  SearchResolver,
  TagResolver,
  UserResolver,
} from './resolvers';
import { verifyAccessToken } from './utils/helpers/auth';
import { activateAccount, OnlineStatus, updateOnlineStatus } from './utils/helpers/utils';
import { JwtUser, MyContext } from './utils/interfaces/interfaces';
import { log } from './utils/services/logger';
import { initS3, minioClient } from './utils/services/minio';

export class Application {
  public host: express.Application;
  public server: Server;
  public pubsub: RedisPubSub;

  //init database connection
  public connect = async (): Promise<void> => {
    try {
      const connection = await createConnection();
      await connection.synchronize();
    } catch (error) {
      console.error('🚨  Could not connect to the database', error);
      throw Error(error);
    }
  };

  //initialize express
  public init = async (): Promise<void> => {
    const app = express();

    const options: Redis.RedisOptions = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      retryStrategy: (times) => Math.max(times * 100, 3000),
    };

    this.pubsub = new RedisPubSub({
      publisher: new Redis(options),
      subscriber: new Redis(options),
      serializer: stringify,
      deserializer: parse,
    });

    //Initizalize the S3-Client and Buckets
    initS3();

    //init roles
    const roleExists = await getRepository(Role).find({ where: { name: 'STUDENT' } });
    if (!roleExists) {
      log.info('role created');
      const role = new Role({ name: 'STUDENT' });
      await getRepository(Role).save(role);
    }
    const roleExists2 = await getRepository(Role).find({ where: { name: 'STUDENT' } });
    if (!roleExists2) {
      log.info('role created');
      const role = new Role({ name: 'PROFESSOR' });
      await getRepository(Role).save(role);
    }

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
          MediaResolver,
          GroupResolver,
        ],
        pubSub: this.pubsub,
        authChecker: customAuthChecker,
      });

      //initialize the graphql server
      const server = new ApolloServer({
        schema,
        subscriptions: {
          keepAlive: 2000,
          async onConnect(connectionParams: { campusToken: string }, socket: MyWebSocket) {
            if (connectionParams.campusToken) {
              const user = verifyAccessToken(connectionParams.campusToken) as JwtUser;
              log.info('✨ user connected to the subscriptions server');
              socket.user = user as JwtUser;
              await updateOnlineStatus(user.id, OnlineStatus.ONLINE);
              return {
                user,
              };
            }
            throw new Error('Missing auth token!');
          },
          async onDisconnect(socket: MyWebSocket) {
            log.info('⛏ user disconnected from the subscriptions server');
            if (socket.user) {
              await updateOnlineStatus(socket.user.id, OnlineStatus.OFFLINE);
            }
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

      //set cors headers correctly
      app.use(cors());

      //sets important security headers
      app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));

      //authentication middleware
      app.use(authenticateToken);

      app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

      //add the pubsub to the context
      app.use((req: express.Request, _res: express.Response, next: express.NextFunction): void => {
        req.pubsub = this.pubsub;
        next();
      });

      //add an compression middleware, to reduce the size of the results via gzip
      app.use(
        compression({
          threshold: 0, // Byte threshold (0 means compress everything)
        }),
      );

      //register file proxy
      app.get('/files/:filename', authenticateToken, async (req: express.Request, res: express.Response) => {
        if (!req.user) return res.sendStatus(403);
        try {
          const { filename } = req.params;
          if (!filename) return res.status(400).send('missing file name');

          minioClient.getObject('images', filename, (err, dataStream) => {
            if (err) {
              log.error('minio get object', err);
              return res.sendStatus(500);
            }
            res.setHeader('content-type', 'base64');
            dataStream.pipe(new Base64Encode()).pipe(res);
            return;
          });
        } catch (err) {
          log.error('IMAGE PROXY', err);
          return res.sendStatus(500);
        }
      });

      //endpoint, to activate the account from the token send via email
      app.get('/activate/:token', async (req: express.Request, res: express.Response) => {
        const { token } = req.params;
        if (!token) return res.status(400).send('missing activation token');

        try {
          await activateAccount(token);
          res.redirect('../../login');
        } catch (err) {
          res.status(400).send(err);
        }
      });

      server.applyMiddleware({ app });

      // start server on default port 5000
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
