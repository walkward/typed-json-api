/**
 * Central error handling
 */

import logging from './logging';

export class AppError extends Error {
  public isOperational: boolean;
  public name: string;
  public stack: string;
  public original?: Error;

  constructor(message: string, isOperational: boolean, error?: Error) {
    super(message);
    this.isOperational = isOperational || false;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // The original error
    this.original = error;
  }
}

export const handleError = (error: AppError | Error) => {
  logging.error(error.stack || error.message);
  if (error instanceof AppError && error.original) {
    logging.error('Original Error:');
    logging.error(error.original.stack || error.original.message);
  }
};
