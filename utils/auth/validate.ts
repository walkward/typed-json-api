import * as Hapi from 'hapi';

import { IRequest } from '../../types';
import { AppError } from '../errors';
import redis from '../redis';

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
