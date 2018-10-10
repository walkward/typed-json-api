/**
 * App Configuration Object
 */

import * as nconf from 'nconf';
import * as path from 'path';

// Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: 'file',
    file: path.join(__dirname, `./config.${process.env.NODE_ENV}.json`),
  },
});

export interface IServerConfigurations {
  port: number;
  plugins: string[];
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
}

export function getServerConfigs(): IServerConfigurations {
  return configs.get('server');
}
