export const server: any = {
  port: 5000,
  jwtSecret: 'random-secret-password',
  jwtExpiration: '1h',
  plugins: [ 'logging', /* 'jwt-auth', */ 'hapi-qs'],
};

export const database: any = {
  host: process.env.POSTGRES_HOST,
  synchronize: true,
  cache: {
    type: 'redis',
    options: {
      host: 'redis',
      port: 6379,
    },
  },
  entities: [
    'dist/entity/**/*.js',
  ],
  migrations: [
    'dist/migration/**/*.js',
  ],
  subscribers: [
    'dist/subscriber/**/*.js',
  ],
};

export const redis: any = {
  host:  'redis',
};
