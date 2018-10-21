import * as path from 'path';

export default {
  server: {
    port: 5000,
    jwtSecret: 'random-secret-password',
    jwtExpiration: '1h',
    plugins: [ /* 'swagger', */ 'logging', /* 'jwt-auth', */ 'hapi-qs'],
  },
  redis: {
    host: 'redis',
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: ['error', 'warn', 'info', 'log'],
    cache: {
      type: 'redis',
      options: {
        host: 'redis',
        port: 6379,
      },
    },
    entities: [
      path.resolve('dist/entity/**/*.js'),
    ],
    migrations: [
      path.resolve('dist/migration/**/*.js'),
    ],
    subscribers: [
      path.resolve('dist/subscriber/**/*.js'),
    ],
    cli: {
      entitiesDir: path.resolve('src/entity'),
      migrationsDir: path.resolve('src/migration'),
      subscribersDir: path.resolve('src/subscriber'),
    },
  },
};
