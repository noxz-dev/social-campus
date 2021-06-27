import * as path from 'path';
console.log(path.resolve(__dirname, '**/*.entity{.ts,.js}'));


export default {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'network_db',
  synchronize: true,
  logging: false,
  entities: [path.resolve(__dirname, '**/*.entity{.ts,.js}')],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
