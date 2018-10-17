/**
 * App Configuration Object
 */

import { defaultsDeep } from 'lodash';
import * as nconf from 'nconf';
import { ConnectionOptions } from 'typeorm';

import { IServerConfigurations } from '../types';
import defaults from './defaults';
import * as development from './development';
import * as production from './production';
import * as test from './test';

const environments: any = {
  production,
  development,
  test,
  cli: {},
};

// Adding environment variables and arguments to config
nconf.env().argv();

// Applying environment specific configs & defaults
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

export default nconf;
