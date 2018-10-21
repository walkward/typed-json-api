import * as Hapi from 'hapi';

import { IRequest } from 'app/types';
import { AppError } from 'app/utils/errors';
import redis from 'app/utils/redis';

export const validate = async (decoded: any, request: IRequest, h: Hapi.ResponseToolkit) => {
  return new Promise((resolve, reject) => {
    redis.get(decoded.id, (error, reply) => {
      if (error) {
        return reject(new AppError(error.message, false, error));
      }

      const session = JSON.parse(reply);

      if (reply) {
        return resolve({ isValid: session.valid });
      } else {
        return resolve({ isValid: false });
      }
    });
  });
};
