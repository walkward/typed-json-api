import * as Redis from 'ioredis';

import { redisConfigs } from 'app/config';

const config = Object.assign({
  retryStrategy: (times: number) => Math.max(times * 100, 3000),
}, redisConfigs());

export const redis = new Redis(config);

export const pub = new Redis(config);

export const sub = new Redis(config);
