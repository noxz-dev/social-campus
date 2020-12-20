import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { Server } from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';
import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { customAuthChecker } from './utils/helpers/authChecker';
import { MyContext } from './utils/interfaces/context.interface';
import { authenticateToken } from './utils/middlewares/auth';


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
        resolvers: [UserResolver, RoleResolver],
        authChecker: customAuthChecker,
      });

      // add graphql route and middleware
      this.host.post(
        '/graphql',
        authenticateToken,
        bodyParser.json(),
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
          console.error('🚨  Something went wrong', error);
          res.status(400).send(error);
        },
      );

      // start server on default port 4000
      const port = process.env.PORT || 5000;
      this.server = this.host.listen(port, () => {
        console.log(`🚀  http://localhost:${port}/graphql`);
      });
    } catch (error) {
      console.error('🚨  Could not start server', error);
    }
  };
}
