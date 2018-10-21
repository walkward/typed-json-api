import * as Hapi from 'hapi';

import { IPlugin } from 'app/types';
import { AppError } from 'app/utils/errors';
import logging from 'app/utils/logging';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([{
      plugin: require('good'),
      options: {
        reporters: {
          winston: [{
            module: 'good-winston',
            args: [{ winston: logging }],
          }],
        },
      },
    }]);
  } catch (err) {
    throw new AppError('Error registering logging plugin', false, err);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'Good Logger', version: '1.0.0' };
    },
  };
};
