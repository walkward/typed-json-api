import * as Configs from '../src/config';
import * as Server from '../src/server';
import * as Database from '../src/database';

// Create a server which will be started/stopped for each test
export const makeServer = async () => {
  const serverConfigs = Configs.getServerConfigs();
  const databaseConfigs = Configs.getDatabaseConfigs();
  await Database.init(databaseConfigs)
  const server = await Server.init(serverConfigs);
  return server;
};
