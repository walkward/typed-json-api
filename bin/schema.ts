#!/usr/bin/env node -r ts-node/register -r tsconfig-paths/register

import * as fs from 'fs';
import * as transform from 'graphql-json-schema';
import * as path from 'path';

try {
  const contents = fs.readFileSync(path.resolve('schema.gql'), 'utf8');
  const schema = transform(contents);
  fs.writeFile(path.resolve('schema.json'), JSON.stringify(schema, null, 2), (error) => {
    if (error) throw error;
    // tslint:disable-next-line:no-console
    console.log('Schema saved to schema.json');
  });
} catch (error) {
  // tslint:disable-next-line:no-console
  console.error(error);
}
