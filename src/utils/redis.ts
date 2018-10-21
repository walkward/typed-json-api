import * as redis from 'redis';

import { redisConfigs } from 'app/config';
import { AppError } from 'app/utils/errors';

const client = redis.createClient(redisConfigs());

client.on('error', (err) => {
  throw new AppError(err.message, false, err);
});

export default client;
