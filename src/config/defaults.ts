import * as database from '../../ormconfig';

export default {
  server: {
    port: 5001,
    jwtSecret: 'random-secret-password',
    jwtExpiration: '1h',
  },
  redis: {
    host: 'localhost',
  },
  database,
};
