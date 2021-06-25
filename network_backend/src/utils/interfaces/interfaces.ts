import { Request, Response } from 'express';

export interface MyContext {
  req: Request;
  res: Response;
}

export interface JwtUser {
  id: string;
  email: string;
  role: string;
}
