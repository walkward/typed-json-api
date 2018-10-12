import * as Hapi from 'hapi';
import { IPlugin } from '../../types';
import { AppError } from '../../utils/errors';

const register = async (server: Hapi.Server): Promise<void> => {
  try {
    return server.register([
      require('inert'),
      require('vision'),
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: 'Task Api',
            description: 'Task Api Documentation',
            version: '1.0',
          },
          tags: [
            {
              name: 'tasks',
              description: 'Api tasks interface.',
            },
            {
              name: 'users',
              description: 'Api users interface.',
            },
          ],
          swaggerUI: true,
          documentationPage: true,
          documentationPath: '/docs',
        },
      },
    ]);
  } catch (err) {
    throw new AppError('Error registering swagger plugin', false, err);
  }
};

export default (): IPlugin => {
  return {
    register,
    info: () => {
      return { name: 'Swagger Documentation', version: '1.0.0' };
    },
  };
};
