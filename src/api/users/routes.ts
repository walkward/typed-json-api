import * as Hapi from 'hapi';

import statusCodes from '../../utils/statusCodes';
import UserController from './user-controller';
import { validateQuery, validateUser } from './user-validator';

export default function(server: Hapi.Server) {
  const userController = new UserController();
  server.bind(userController);

  server.route({
    method: 'GET',
    path: '/users/{id}',
    options: {
      handler: userController.getUser,
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Get a user.',
      validate: {
        query: validateQuery,
      },
      plugins: {
        'hapi-swagger': {
          responses: statusCodes.GET,
        },
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/users',
    options: {
      handler: userController.getUsers,
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Get users.',
      validate: {
        query: validateQuery,
      },
      plugins: {
        'hapi-swagger': {
          responses: statusCodes.GET,
        },
      },
    },
  });

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    options: {
      handler: userController.deleteUser,
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Delete current user.',
      validate: {},
      plugins: {
        'hapi-swagger': {
          responses: statusCodes.DELETE,
        },
      },
    },
  });

  server.route({
    method: 'PUT',
    path: '/users/{id}',
    options: {
      handler: userController.updateUser,
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Update current user info.',
      validate: {
        payload: validateUser,
      },
      plugins: {
        'hapi-swagger': {
          responses: statusCodes.PUT,
        },
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/users',
    options: {
      handler: userController.createUser,
      auth: 'jwt',
      tags: ['api', 'users'],
      description: 'Create a user.',
      validate: {
        payload: validateUser,
      },
      plugins: {
        'hapi-swagger': {
          responses: statusCodes.POST,
        },
      },
    },
  });
}
