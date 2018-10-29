import * as Hapi from 'hapi';

import { serverConfigs } from 'app/config';
import { IPlugin } from 'app/types';
import { validate } from 'app/utils/auth';
import { AppError } from 'app/utils/errors';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
      key: serverConfigs().jwtSecret,
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
