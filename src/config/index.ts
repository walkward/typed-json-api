/**
 * App Configuration
 */

import { defaultsDeep } from 'lodash';
import * as nconf from 'nconf';

import defaults from './defaults';
import * as development from './development';
import * as production from './production';
import * as test from './test';

const environments: any = {
  production,
  development,
  test,
  cli: development,
};

// Adding environment variables and arguments to config
nconf.env().argv();

// Applying environment specific configs & defaults
nconf.defaults(defaultsDeep(environments[nconf.get('NODE_ENV')], defaults));

export function redisConfigs(): any {
  return nconf.get('redis');
}

export function serverConfigs(): any {
  return nconf.get('server');
}

export function databaseConfigs(): any {
  return nconf.get('database');
}
