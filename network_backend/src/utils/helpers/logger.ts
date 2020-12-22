import { ConsoleTransport, createLogger, FileTransport } from '@boost/log';
import chalk from 'chalk';
export const log = createLogger({
  name: 'network_logger',
  labels: {
    error: chalk.bgRed.white.bold(' ERROR '),
    info: chalk.bgGreen.white.bold(' INFO '),
    debug: chalk.bgBlue.white.bold(' DEBUG '),
  },
  transports: [
    new FileTransport({
      levels: ['error'],
      path: './log/error.log',
    }),
    new FileTransport({
      levels: ['info'],
      path: './log/info.log',
    }),
    new ConsoleTransport(),
  ],
});
