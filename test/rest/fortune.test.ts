/**
 * Testing resource rest methods
 */

require('dotenv').config() // tslint:disable-line

import test from 'ava';
import * as request from 'supertest';

import { authenticate } from '../../utils/auth';
// import { deserialize, serialize } from '../../../utils/json';
import { makeServer } from '../helpers';

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
  t.context.token = authenticate();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test('get asset', async (t) => {
  const get = await request(t.context.server.listener)
    .get(`/api/users/14f63409-786b-4975-9879-ad45d04d7e4b`)
    .set('Authorization', `Bearer ${t.context.token}`);

  t.is(get.status, 200, get.body.message);
});
