import * as Hapi from 'hapi';

import { IPlugin } from '../../types';
import { AppError } from '../../utils/errors';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register({
      plugin: require('hapi-qs'),
      options: {
        qsOptions: {
          allowDots: false,
          allowPrototypes: false,
          arrayLimit: 20,
          charset: 'utf-8',
          charsetSentinel: false,
          delimiter: '&',
          depth: 5,
          ignoreQueryPrefix: false,
          interpretNumericEntities: false,
          parameterLimit: 1000,
          parseArrays: true,
          plainObjects: false,
          strictNullHandling: false,
        },
      },
    });
  } catch (err) {
    throw new AppError('Error registering hapi-qs plugin', false, err);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'Hapi QS', version: '2.0.1' };
    },
  };
};
