#!/usr/bin/env node

/*
 * Cli entry point
 */

const fs = require('fs');
const path = require('path');

require('dotenv').config();

process.env.NODE_ENV = 'cli';

try {
  if (fs.existsSync(path.resolve('dist/cli/index.js')))
    require('../dist/cli').run();
  else
    throw new Error('Please run build script before using cli');
} catch (err) {
  console.error(`\n  ${err.message}`); // tslint:disable-line
  process.exit(1);
}
