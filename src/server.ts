import * as Hapi from 'hapi';

import { AppError } from 'app/utils/errors';
import logging from 'app/utils/logging';
import { IPlugin, IServerConfigurations } from './types';

import * as Notifications from 'app/api/notifications';

export async function init(serverConfigs: IServerConfigurations): Promise<Hapi.Server> {
  try {
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      port: serverConfigs.port,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    /* ========== Start Setup Hapi Plugins ========== */

    const plugins: string[] = serverConfigs.plugins;
    const pluginOptions = { serverConfigs };

    const pluginPromises: Array<Promise<any>> = [];

    plugins.forEach((pluginName: string) => {
      const plugin: IPlugin = require('./plugins/' + pluginName).default();
      logging.info(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
      pluginPromises.push(plugin.register(server, pluginOptions));
    });

    await Promise.all(pluginPromises);
    logging.info('All plugins registered successfully.');

    /* ========== End Setup Hapi Plugins ========== */

    /* ========== Start Registering Routes ========== */

    Notifications.init(server);
    logging.info('Routes registered sucessfully.');

    /* ========== End Registering Routes ========== */

    return server;
  } catch (err) {
    throw new AppError(`Error starting server: ${err.message}`, false, err);
  }
}
