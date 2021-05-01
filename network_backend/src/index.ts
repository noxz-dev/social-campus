import 'dotenv/config';
import process from 'process';
import 'reflect-metadata';
import { Application } from './application';

process.on('SIGINT', () => {
  console.info('Interrupted');
  process.exit(0);
});

(async () => {
  const application = new Application();
  await application.connect();
  await application.init();
})();
