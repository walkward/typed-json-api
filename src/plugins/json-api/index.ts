import * as Hapi from 'hapi';

import { IPlugin } from '../../types';
import { AppError } from '../../utils/errors';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([{
      plugin: require('@gar/hapi-json-api'),
      options: {},
    }]);
  } catch (err) {
    throw new AppError('Error registering hapi-json-api plugin', false, err);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'hapi-json-api', version: '3.0.2' };
    },
  };
};
