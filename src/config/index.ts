/**
 * App Configuration Object
 */

import { defaultsDeep } from 'lodash';
import * as nconf from 'nconf';
import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

import { IServerConfigurations } from '../types';

const defaults = {
  server: {
    port: 5000,
    jwtSecret: 'random-secret-password',
    jwtExpiration: '1h',
    routePrefix: '/api',
    plugins: ['swagger', 'logging', 'jwt-auth', 'hapi-qs', 'json-api'],
  },
  redis: {
    host: 'redis',
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: ['error', 'warn', 'info', 'log'],
    cache: {
      type: 'redis',
      options: {
        host: 'redis',
        port: 6379,
      },
    },
    entities: [
      path.resolve('dist/entity/**/*.js'),
    ],
    migrations: [
      path.resolve('dist/migration/**/*.js'),
    ],
    subscribers: [
      path.resolve('dist/subscriber/**/*.js'),
    ],
  },
};

const environments: any = {
  test: {
    server: {
      port: 0,
    },
    database: {
      host: 'localhost',
      cache: {
        options: {
          host: 'localhost',
        },
      },
      entities: [
        path.resolve('src/entity/**/*.ts'),
      ],
      migrations: [
        path.resolve('src/migration/**/*.ts'),
      ],
      subscribers: [
        path.resolve('src/subscriber/**/*.ts'),
      ],
    },
    redis: {
      host: 'localhost',
    },
  },
  development: {
    server: {
      port: 5001,
    },
    database: {
      host: 'localhost',
      cache: {
        options: {
          host: 'localhost',
        },
      },
      entities: [
        path.resolve('src/entity/**/*.ts'),
      ],
      migrations: [
        path.resolve('src/migration/**/*.ts'),
      ],
      subscribers: [
        path.resolve('src/subscriber/**/*.ts'),
      ],
    },
    redis: {
      host: 'localhost',
    },
  },
  production: {},
};

nconf.env().argv();
nconf.defaults(defaultsDeep(environments[nconf.get('NODE_ENV')], defaults));

export function getRedisConfigs(): any {
  return nconf.get('redis');
}

export function getServerConfigs(): IServerConfigurations {
  return nconf.get('server');
}

export function getDatabaseConfigs(): ConnectionOptions {
  return nconf.get('database');
}
