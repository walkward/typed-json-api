import * as aguid from 'aguid';
import * as Hapi from 'hapi';
import * as JWT from 'jsonwebtoken';
import * as nconf from 'nconf';

import { IRequest } from '../types';
import { AppError } from './errors';
import redis from './redis';

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

export const authenticate = () => {
  const session = {
    valid: true, // this will be set to false when the person logs out
    id: aguid(), // a random session id
    exp: new Date().getTime() + 30 * 60 * 1000, // expires in 30 minutes time
  };

  // create the session in Redis
  redis.set(session.id, JSON.stringify(session));

  // sign the session as a JWT
  return JWT.sign(session, nconf.get('server').jwtSecret);
};
