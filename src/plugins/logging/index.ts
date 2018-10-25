import * as Hapi from 'hapi';

import { IPlugin } from 'app/types';
import { AppError } from 'app/utils/errors';
import log from 'app/utils/log';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([{
      plugin: require('good'),
      options: {
        reporters: {
          winston: [{
            module: 'good-winston',
            args: [{ winston: log }],
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
