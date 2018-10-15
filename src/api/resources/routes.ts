// import { Validator } from 'class-validator';
import * as Hapi from 'hapi';

import statusCodes from './constants';
import Controller from './controller';
import { validateQuery, validateResource } from './validator';

export default function(server: Hapi.Server) {
  // const validator = new Validator();

  const controller = new Controller();
  server.bind(controller);

  server.route({
    method: 'GET',
    path: '/{type}/{id}',
    options: {
      handler: controller.get,
      auth: 'jwt',
      tags: ['api', 'resources'],
      description: 'Get a resource.',
      validate: {
        query: validateQuery,
        // {
        //   id: async (value) => validator.isUUID(value) ? value : false,
        // },
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
    path: '/{type}',
    options: {
      handler: controller.gets,
      auth: 'jwt',
      tags: ['api', 'resources'],
      description: 'Get resources.',
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
    path: '/{type}/{id}',
    options: {
      handler: controller.delete,
      auth: 'jwt',
      tags: ['api', 'resources'],
      description: 'Delete resource.',
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
    path: '/{type}/{id}',
    options: {
      handler: controller.update,
      auth: 'jwt',
      tags: ['api', 'resources'],
      description: 'Update current info.',
      validate: {
        payload: validateResource,
        failAction: 'error',
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
    path: '/{type}',
    options: {
      handler: controller.create,
      auth: 'jwt',
      tags: ['api', 'resources'],
      description: 'Create a resource.',
      validate: {
        payload: validateResource,
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
