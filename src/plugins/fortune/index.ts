// import * as fortuneHTTP from 'fortune-http';
// import * as jsonApiSerializer from 'fortune-json-api';
import * as Hapi from 'hapi';

import { IPlugin } from '../../../types';
import { AppError } from '../../../utils/errors';
// import { store } from './fortune';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return;
  } catch (err) {
    throw new AppError('Error registering fortune plugin', false, err);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'Fortune', version: '0.0.1' };
    },
  };
};
