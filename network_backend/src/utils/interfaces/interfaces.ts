import { Request, Response } from 'express';
// import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export interface MyContext {
  req: Request;
  res: Response;
}

export interface JwtUser {
  id: string;
  email: string;
  role: string;
}
