import { AppError } from 'app/utils/errors';
import log from 'app/utils/log';

export const handleError = (error: AppError | Error) => {
  log.error(error.stack || error.message);
};
