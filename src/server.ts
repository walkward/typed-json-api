import * as Hapi from 'hapi';

import { IPlugin, IServerConfigurations } from '../types';
import { AppError } from '../utils/errors';
import logging from '../utils/logging';

// import * as Resources from './api/resources';
// import * as Fortune from './api/fortune';

export async function init(configs: IServerConfigurations): Promise<Hapi.Server> {
  try {
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      port: configs.port,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    if (configs.routePrefix) {
      server.realm.modifiers.route.prefix = configs.routePrefix;
    }

    //  Setup Hapi Plugins
    const plugins: string[] = configs.plugins;
    const pluginOptions = {
      serverConfigs: configs,
    };

    const pluginPromises: Array<Promise<any>> = [];

    plugins.forEach((pluginName: string) => {
      const plugin: IPlugin = require('./plugins/' + pluginName).default();
      logging.info(
        `Register Plugin ${plugin.info().name} v${plugin.info().version}`,
      );
      pluginPromises.push(plugin.register(server, pluginOptions));
    });

    await Promise.all(pluginPromises);
    logging.info('All plugins registered successfully.');

    // Fortune.init(server);
    logging.info('Routes registered sucessfully.');

    return server;
  } catch (err) {
    throw new AppError(`Error starting server: ${err.message}`, false, err);
  }
}
