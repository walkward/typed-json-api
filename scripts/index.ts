import * as meow from 'meow';

import { databaseConfigs } from '../src/config';

import create from './db/create';
import recreate from './db/recreate';

const commandMap: any = {
  db: {
    recreate,
    create,
  },
};

const cli = meow(`
    Usage
      $ clique-cli <command> <task> [options]
    Commands
      db
    Options
      -h, --help           Show help
      -e, --environment    Environment in which to run the command (development) (required)
      --db-host            MySql host, defaults to 127.0.0.1 (127.0.0.1) (required)
      --db-user            MySql user (root) (required)
      --db-password        MySql password (password) (required)
      --db-name            MySql database name (clique) (required)
    Examples
      $ clique-cli db recreate --db-host 127.0.0.1
`, {
  flags: {
    databaseHost: {
      type: 'string',
      default: databaseConfigs().host,
    },
    databaseUser: {
      type: 'string',
      default: databaseConfigs().user,
    },
    databasePassword: {
      type: 'string',
      default: databaseConfigs().password,
    },
    databaseName: {
      type: 'string',
      default: databaseConfigs().name,
    },
  },
});

export function run() {
  const [command, task] = cli.input;

  if (!task) {
    return commandMap[command](cli.flags);
  } else {
    return commandMap[command][task](cli.flags);
  }
}