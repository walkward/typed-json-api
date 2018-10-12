import * as Hapi from 'hapi';
import { IServerConfigurations } from '../../config';
import { IDatabase } from '../../database';
import Routes from './routes';

export function init(
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase,
) {
  Routes(server, configs, database);
}
