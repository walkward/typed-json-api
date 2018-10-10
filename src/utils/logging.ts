/**
 * Logging with Winston
 *
 * @namespace logger
 */

import * as winston from 'winston';

const level = (): string => {
  if (process.env.NODE_ENV === 'production') return 'info';
  if (process.env.NODE_ENV === 'test') return 'error';
  return 'debug';
};

const logger = new winston.Logger({
  level: level(),
  transports: [
    new winston.transports.Console({
      colorize: true,
    }),
  ],
});

export default logger;
