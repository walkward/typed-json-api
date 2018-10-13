/**
 * App entry point
 */

import * as dotenv from 'dotenv';
dotenv.config(); // tslint:disable-line

import * as Configs from './config';
import * as Database from './database';
import * as Server from './server';
import { AppError } from './utils/errors';
import logging from './utils/logging';
import './utils/uncaught';

logging.info(`Running environment ${process.env.NODE_ENV}`);

export const start = async () => {
  try {
    // Starting Application Server
    const serverConfigs = Configs.getServerConfigs();
    const databaseConfigs = Configs.getDatabaseConfigs();

    await Database.init(databaseConfigs);
    logging.info('Successfully connected to db...');

    const server = await Server.init(serverConfigs);
    await server.start();
    logging.info('Server running at:', server.info.uri);

    return server;
  } catch (error) {
    throw new AppError(error.message, false, error);
  }
};

// Start the server
start();
