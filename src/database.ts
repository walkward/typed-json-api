import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-hapi';
import * as Hapi from 'hapi';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import * as resolvers from 'app/resolvers';
import { authChecker } from 'app/utils/auth';
import { AppError } from 'app/utils/errors';
import log from 'app/utils/log';

export async function init(config: TypeORM.ConnectionOptions, server: Hapi.Server): Promise<void> {
  try {
    TypeGraphQL.useContainer(Container);
    TypeORM.useContainer(Container);

    await TypeORM.createConnection(config);

    const schema = await TypeGraphQL.buildSchema({
      resolvers: Object.values(resolvers),
      authChecker,
    });

    // Create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      debug: true,
      formatError: TypeGraphQL.formatArgumentValidationError,
      playground: true,
      subscriptions: {
        path: '/subscriptions',
      },
    });

    await apolloServer.applyMiddleware({
      app: server,
      path: '/graphql',
    });

    await apolloServer.installSubscriptionHandlers(server.listener);

    log.info(`Apollo server registered to server`);
  } catch (error) {
    throw new AppError('Error initializing database', false, error);
  }
}
