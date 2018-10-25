/**
 * These are the default development settings. These settings will be
 * overridden in production environment with the settings found in
 * config/production.
 */

require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true, // Not safe for production
  logging: ['error', 'warn', 'info', 'log'],
  cache: {
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379,
    },
  },
  entities: [
    'src/entity/**/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
