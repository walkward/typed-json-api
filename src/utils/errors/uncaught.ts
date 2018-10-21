/**
 * Uncaught Errors
 * ------------------
 * Uncaught errors are forwarded to our error handling.
 *
 */

import { AppError, handleError } from 'app/utils/errors';

process.on('unhandledRejection', (err: AppError | Error) => {
  throw err;
});

process.on('uncaughtException', (err: AppError | Error) => {
  handleError(err);
  if (err instanceof AppError && err.isOperational !== true) {
    process.exit(1);
  }
});
