import Redis from 'ioredis';

//setup redis client
export const redis = new Redis({
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT),
});
