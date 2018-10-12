import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';

import { AppError } from './utils/errors';

export async function init(config: ConnectionOptions): Promise<any> {
  try {
    const connection = await createConnection(config);
    return connection;
  } catch (error) {
    throw new AppError('Error initializing database', false, error);
  }
}
