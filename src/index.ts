/**
 * App entry point
 */

import * as dotenv from 'dotenv';

import * as Configs from './config';
import * as Database from './database';
import * as Server from './server';
import { AppError } from './utils/errors';
import logging from './utils/logging';
import './utils/uncaught';

logging.info(`Running environment ${process.env.NODE_ENV}`);

// Loading environment variables
dotenv.config();

const start = async (configs: any) => {
  try {
    await Database.init(configs.databaseConfigs);
    logging.info('Successfully connected to db...');

    const server = await Server.init(configs.serverConfigs);
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
