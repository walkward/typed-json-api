import * as Hapi from 'hapi';
import * as nconf from 'nconf';

import { IPlugin } from '../../../types';
import { validate } from '../../../utils/auth';
import { AppError } from '../../../utils/errors';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
      key: nconf.get('server').jwtSecret,
      validate,
      // Use when username & password are authenticated
      // verifyOptions: {
      //   algorithms: ['HS256'],
      // },
    });
    server.auth.default('jwt');
  } catch (err) {
    throw new AppError('Error registering jwt-auth plugin', false, err);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'JWT Authentication', version: '1.0.0' };
    },
  };
};
