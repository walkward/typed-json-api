import * as Hapi from 'hapi';
import UserController from './user-controller';
import * as UserValidator from './user-validator';

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
      description: 'Get user info.',
      validate: {
        // headers: UserValidator.jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'User founded.',
            },
            401: {
              description: 'Please login.',
            },
          },
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
      validate: {
        // headers: UserValidator.jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'User deleted.',
            },
            401: {
              description: 'User does not have authorization.',
            },
          },
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
        payload: UserValidator.createUser,
        // headers: UserValidator.jwtValidator
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Updated info.',
            },
            401: {
              description: 'User does not have authorization.',
            },
          },
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
        payload: UserValidator.createUser,
        // headers: UserValidator.jwtValidator,
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: {
              description: 'User created.',
            },
          },
        },
      },
    },
  });
}
