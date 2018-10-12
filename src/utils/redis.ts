import * as redis from 'redis';
import { AppError } from './errors';

const client = redis.createClient({
  host: 'redis',
});

client.on('error', (err) => {
  throw new AppError(err.message, false, err);
});

export default client;
