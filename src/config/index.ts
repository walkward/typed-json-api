/**
 * App Configuration Object
 */

import * as nconf from 'nconf';
import * as path from 'path';
import { IServerConfigurations } from '../types'
import { ConnectionOptions } from "typeorm";

// Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: 'file',
    file: path.join(__dirname, `./config.${process.env.NODE_ENV}.json`),
  },
});

export function getServerConfigs(): IServerConfigurations {
  return configs.get('server');
}

export function getDatabaseConfigs(): ConnectionOptions {
  return configs.get('database');
}
