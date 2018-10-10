/**
 * Uncaught Errors
 * ------------------
 * Uncaught errors are forwarded to our error handling.
 *
 */

import { AppError, handleError } from './errors';

process.on('unhandledRejection', (err: AppError | Error) => {
  throw err;
});

process.on('uncaughtException', (err: AppError | Error) => {
  handleError(err);
  if ((err instanceof AppError && err.isOperational !== true) || err instanceof Error) {
    process.exit(1);
  }
});
