import * as path from 'path';

export const server: any  = {
  port: 5001,
};

export const database: any = {
  host: 'localhost',
  cache: {
    options: {
      host: 'localhost',
    },
  },
  entities: [
    path.resolve('src/entity/**/*.ts'),
  ],
  migrations: [
    path.resolve('src/migration/**/*.ts'),
  ],
  subscribers: [
    path.resolve('src/subscriber/**/*.ts'),
  ],
};

export const redis: any = {
  host: 'localhost',
};
