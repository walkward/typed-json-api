import * as Hapi from 'hapi';
import {Container} from 'typedi';

import statusCodes from './constants';
import NotificationRepository from './repository';
import { validatePayload } from './validator';

export default function(server: Hapi.Server) {
  const repository = Container.get(NotificationRepository);
  server.bind(repository);

  server.route({
    method: 'POST',
    path: '/api/notifications',
    options: {
      handler: repository.create,
      // auth: 'jwt',
      tags: ['api', 'notifications'],
      description: 'Create a notifications.',
      validate: {
        payload: validatePayload,
        failAction: 'error',
      },
      plugins: {
        'hapi-swagger': {
          responses: statusCodes.POST,
        },
      },
    },
  });
}
