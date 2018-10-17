import { start } from '../../src';

// Create a server which will be started/stopped for each test
export const makeServer = async () => {
  const server = await start();
  return server;
};
