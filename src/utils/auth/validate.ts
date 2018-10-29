import * as Hapi from 'hapi';

import { IRequest } from 'app/types';
import { AppError } from 'app/utils/errors';
import { redis } from 'app/utils/redis';

export const validate = async (decoded: any, request: IRequest, h: Hapi.ResponseToolkit) => {
  return new Promise((resolve, reject) => {
    redis.get(decoded.id, (error, res) => {
      if (error) {
        return reject(new AppError(error.message, false, error));
      }

      if (res) {
        const session: any = JSON.parse(res);
        return resolve({ isValid: session.valid });
      } else {
        return resolve({ isValid: false });
      }
    });
  });
};
