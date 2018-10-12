import "reflect-metadata";
import { createConnection /*, ConnectionOptions */ } from "typeorm";

import { AppError } from './utils/errors';

export async function init(/* config: ConnectionOptions */): Promise<any> {
  try {
    const connection = await createConnection()
    return connection;
  } catch (error) {
    throw new AppError('Error initializing database', false, error);
  }
}
