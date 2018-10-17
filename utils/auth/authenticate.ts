import * as aguid from 'aguid';
import * as JWT from 'jsonwebtoken';
import * as nconf from 'nconf';

import { AppError } from '../errors';
import redis from '../redis';

export const authenticate = () => {
  try {
    const session = {
      valid: true, // this will be set to false when the person logs out
      id: aguid(), // a random session id
      exp: new Date().getTime() + 30 * 60 * 1000, // expires in 30 minutes time
    };

    // create the session in Redis
    redis.set(session.id, JSON.stringify(session));

    // sign the session as a JWT
    return JWT.sign(session, nconf.get('server').jwtSecret);
  } catch (error) {
    throw new AppError(error.message, false, error);
  }
};
