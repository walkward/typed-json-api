/**
 * App Configuration Object
 */

import { merge } from 'lodash';
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
    plugins: ['swagger', 'logging', 'jwt-auth'],
  },
  database: {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'user',
    password: 'de6a645113adf969363369ed4a25d3',
    database: 'clique-api',
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
      path.resolve('src/entity/**/*.ts'),
    ],
    migrations: [
      path.resolve('src/migration/**/*.ts'),
    ],
    subscribers: [
      path.resolve('src/subscriber/**/*.ts'),
    ],
  },
};

const environments: any = {
  test: {
    server: {
      port: 5001,
    },
  },
  development: {},
  production: {},
};

nconf.env().argv();
nconf.defaults(merge(defaults, environments[nconf.get('NODE_ENV')]));

export function getServerConfigs(): IServerConfigurations {
  return nconf.get('server');
}

export function getDatabaseConfigs(): ConnectionOptions {
  return nconf.get('database');
}
