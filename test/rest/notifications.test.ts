/**
 * Testing resource rest methods
 */

import anyTest, { TestInterface } from 'ava';
import * as request from 'supertest';

import { authenticate } from '../../src/utils/auth';
import { makeServer } from '../helpers';

const test = anyTest as TestInterface<{server: any, token: string}>;

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
  t.context.token = authenticate();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test('create notification', async (t) => {
  const notification = {
    message: 'something',
  };

  const post = await request(t.context.server.listener)
    .post(`/api/notifications`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(notification);

  t.is(post.status, 201, post.body.message);
});
