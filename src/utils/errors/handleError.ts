import { AppError } from 'app/utils/errors';
import logging from 'app/utils/logging';

export const handleError = (error: AppError | Error) => {
  logging.error(error.stack || error.message);
};
