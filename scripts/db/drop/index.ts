import * as TypeORM from 'typeorm';

import * as config from '../../../src/config';
import { done } from '../../helpers';

export async function drop() {
  // Get config
  const databaseConfigs = config.databaseConfigs();

  // Creating connection with DB
  const connection = await TypeORM.createConnection(databaseConfigs);

  await connection.dropDatabase();

  done('Successfully dropped db');
}
