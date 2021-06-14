import { ApolloServer } from 'apollo-server-express';
import { Base64Encode } from 'base64-stream';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import { Token } from './entity/token.entity';
import { EventEmitter } from 'events';
import express from 'express';
import 'express-async-errors';
import { parse, stringify } from 'flatted';
import { GraphQLSchema } from 'graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { graphqlUploadExpress } from 'graphql-upload';
import http, { Server } from 'http';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection, getRepository } from 'typeorm';
import { MyWebSocket } from 'utils/types/apollo';
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
import { customAuthChecker } from './utils/middlewares/resolverAuthCheck';
import { OnlineStatus, updateOnlineStatus } from './utils/helpers/utils';
import { MyContext } from './utils/interfaces/context.interface';
import { JwtUser } from './utils/interfaces/jwtUser.interface';
import { authenticateToken } from './utils/middlewares/auth';
import { log } from './utils/services/logger';
import { initS3, minioClient } from './utils/services/minio';
import { User } from './entity/user.entity';
import helmet from 'helmet';

export class Application {
  public host: express.Application;
  public server: Server;
  public pubsub: RedisPubSub;

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
    const em = new EventEmitter();
    em.setMaxListeners(30);
    // this.pubsub = new PubSub({ eventEmitter: em });

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

      app.use(cors());
      // app.use(helmet());
      app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
      //authentication middleware
      app.use(authenticateToken);
      app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

      app.use((req: express.Request, _res: express.Response, next: express.NextFunction): void => {
        req.pubsub = this.pubsub;
        next();
      });
      app.use(
        compression({
          threshold: 0, // Byte threshold (0 means compress everything)
        }),
      );

      //register file proxy
      app.get('/files/:filename', async (req, res) => {
        // if (!req.user) return res.sendStatus(403);
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

      app.get('/activate/:token', async (req, res) => {
        const { token } = req.params;

        console.log(token);

        if (!token) return res.status(400).send('missing activation token');

        const dbToken = await getRepository(Token).findOne({ where: { token: token } });

        if (!dbToken) return res.status(400).send('activation token not valid');

        const user = await getRepository(User).findOne({ where: { id: dbToken.userId } });

        if (!dbToken) return res.status(400).send('no associated user found');

        user.activated = true;

        console.log(user, dbToken);

        await getRepository(User).save(user);
        await getRepository(Token).remove(dbToken);

        // res.set('Content-Type', 'text/html');
        // return res.send(Buffer.from('<h2>Test String</h2>'));
        res.send('../login');
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
