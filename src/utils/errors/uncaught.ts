/**
 * Uncaught Errors
 * ------------------
 * Uncaught errors are forwarded to our error handling.
 *
 */

import { handleError } from 'app/utils/errors';

process.on('unhandledRejection', (err: any) => {
  throw err;
});

process.on('uncaughtException', (err: any) => {
  handleError(err);
  if (err.isOperational !== true) {
    process.exit(1);
  }
});
