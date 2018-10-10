import * as Hapi from 'hapi';
import { IServerConfigurations } from './config';
import { IPlugin } from './types/plugins';
import { AppError } from './utils/errors';
import logging from './utils/logging';

export async function init(
  configs: IServerConfigurations,
): Promise<Hapi.Server> {
  try {
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      port: process.env.PORT,
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

    logging.info('Register Routes');
    // Analyze.init(server, configs);
    logging.info('Routes registered sucessfully.');

    return server;
  } catch (err) {
    throw new AppError('Error starting server:', false, err);
  }
}
