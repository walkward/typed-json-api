import * as TypeORM from 'typeorm';

import * as config from '../../../src/config';
import { done } from '../../helpers';

export async function create() {
  // Get config
  const databaseConfigs = config.databaseConfigs();
  await TypeORM.createConnection(databaseConfigs);

  done('Successfully created db');
}
