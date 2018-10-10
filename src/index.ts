/**
 * App entry point
 */

import * as dotenv from 'dotenv';
import * as Configs from './config';
import './utils/uncaught';
import * as Server from './server';
import logging from './utils/logging';
import "reflect-metadata";

logging.info(`Running environment ${process.env.NODE_ENV || 'dev'}`);

// Loading environment variables
dotenv.config();

// Define async start function
const start = async ({ config }: any) => {
  try {
    const server = await Server.init(config);
    await server.start();
    logging.info('Server running at:', server.info.uri);
  } catch (err) {
    logging.info('Error starting server: ', err.message);
    throw err;
  }
};

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

// Start the server
start({ config: serverConfigs });
