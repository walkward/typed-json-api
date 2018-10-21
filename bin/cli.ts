#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config(); // tslint:disable-line

import { run } from '../scripts';

process.env.NODE_ENV = 'cli';

try {
  run();
} catch (err) {
  console.error(err.message); // tslint:disable-line
  process.exit(1);
}
