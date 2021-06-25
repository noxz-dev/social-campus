import 'dotenv/config';
import process from 'process';
import 'reflect-metadata';
import { Application } from './application';

//close correctly if a closing signal is received
process.on('SIGINT', () => {
  console.info('Interrupted');
  process.exit(0);
});

//create an new Application and connect to all services
(async () => {
  const application = new Application();
  await application.connect();
  await application.init();
})();
