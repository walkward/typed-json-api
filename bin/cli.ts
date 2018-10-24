#!/usr/bin/env node -r ts-node/register

process.env.NODE_ENV = 'cli';

import * as dotenv from 'dotenv';
dotenv.config(); // tslint:disable-line

import { run } from '../scripts';

try {
  run();
} catch (err) {
  console.error(err.message); // tslint:disable-line
  process.exit(1);
}
