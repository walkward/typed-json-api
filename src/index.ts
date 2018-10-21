/**
 * App entry point
 */

import 'app/utils/errors/uncaught';
import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-hapi';
import * as Hapi from 'hapi';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import * as config from 'app/config';
import * as resolvers from 'app/resolvers';
import * as Server from 'app/server';
import { authChecker } from 'app/utils/auth';
import { AppError } from 'app/utils/errors';
import logging from 'app/utils/logging';

export async function start(): Promise<Hapi.Server> {
  try {
    logging.info(`Running environment ${process.env.NODE_ENV}`);

    // Registering dependencies with typedi
    TypeGraphQL.useContainer(Container);
    TypeORM.useContainer(Container);

    // Getting configs
    const serverConfigs = config.serverConfigs();
    const databaseConfigs = config.databaseConfigs();

    // Creating connection with DB
    await TypeORM.createConnection(databaseConfigs);

    // Creating GraphQL schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: Object.values(resolvers),
      authChecker,
    });

    // Initializing Hapi server
    const server: Hapi.Server = await Server.init(serverConfigs);

    // Create Apollo server
    const apolloServer = new ApolloServer({
      schema,
      debug: true,
      formatError: TypeGraphQL.formatArgumentValidationError,
      playground: true,
      subscriptions: {
        path: '/subscriptions',
      },
    });

    // Adding Apollo server to Hapi
    await apolloServer.applyMiddleware({
      app: server,
      path: '/graphql',
    });

    // Initializing Apollo subscriptions
    await apolloServer.installSubscriptionHandlers(server.listener);

    // Starting Hapi server
    await server.start();

    return server;
  } catch (error) {
    throw new AppError(error.message, false, error);
  }
}

// Start the server
if (process.env.NODE_ENV !== 'test') {
  start();
}
