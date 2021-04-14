import GraphQLDatabaseLoader from '@mando75/typeorm-graphql-loader';
import { Request, Response } from 'express';
// import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export interface MyContext {
  req: Request;
  res: Response;
  loader: GraphQLDatabaseLoader;
}
