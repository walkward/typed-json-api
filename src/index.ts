/**
 * App entry point
 */

import * as dotenv from 'dotenv';

import * as Configs from './config';
import './utils/uncaught';
import * as Server from './server';
import * as Database from './database';
import logging from './utils/logging';
import { AppError } from './utils/errors';

logging.info(`Running environment ${process.env.NODE_ENV}`);

// Loading environment variables
dotenv.config();

const start = async ({ serverConfigs, databaseConfigs }: any) => {
  try {
    await Database.init(databaseConfigs);
    logging.info("Successfully connected to db...");

    const server = await Server.init(serverConfigs);
    await server.start();
    logging.info('Server running at:', server.info.uri);
  } catch (error) {
    throw new AppError(error.message, false, error);
  }
};

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();
const databaseConfigs = Configs.getDatabaseConfigs();

// Start the server
start({ serverConfigs, databaseConfigs });
