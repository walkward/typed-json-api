import * as meow from 'meow';

import { databaseConfigs } from '../src/config';

import * as db from './db';

const commandMap: any = {
  db,
};

const cli = meow(`
    Usage
      $ clique-cli <command> <task> [options]
    Commands/Tasks
      db create
      db drop
      db seed
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

  if (!task && command) {
    return commandMap[command](cli.flags);
  } else if (command && task) {
    return commandMap[command][task](cli.flags);
  } else {
    throw Error('You must provide a command');
  }
}
