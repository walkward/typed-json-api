import * as redis from 'redis';
import { getRedisConfigs } from '../config';
import { AppError } from './errors';

const client = redis.createClient(getRedisConfigs());

client.on('error', (err) => {
  throw new AppError(err.message, false, err);
});

export default client;
