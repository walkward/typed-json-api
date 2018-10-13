/**
 * Central error handling
 */

import logging from './logging';

export class AppError extends Error {
  public isOperational: boolean;
  public name: string;
  public stack: string;

  constructor(message: string, isOperational: boolean, error?: Error) {
    super(message);
    this.isOperational = isOperational || false;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Logging the original error
    if (error && error instanceof AppError === false) {
      logging.error(`Original Error: ${error.stack || error.message}`);
    }
  }
}

export const handleError = (error: AppError | Error) => {
  logging.error(error.stack || error.message);
};
