import * as Hapi from 'hapi';
import { start } from '../../src';

// Create a server which will be started/stopped for each test
export const makeServer = async (): Promise<Hapi.Server> => {
  const server = await start();
  return server;
};
