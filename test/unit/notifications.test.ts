/**
 * Testing resource rest methods
 */

import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import anyTest, { TestInterface } from 'ava';
import * as Hapi from 'hapi';
import * as request from 'supertest';

import { authenticate } from '../../src/utils/auth';
import { makeServer } from '../helpers';

const test = anyTest as TestInterface<{
  server: Hapi.Server,
  token: string,
  client: ApolloClient<NormalizedCacheObject>,
}>;

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
  t.context.token = authenticate();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test.skip('create notification', async (t) => {
  const notification = {
    message: 'something',
  };

  const post = await request(t.context.server.listener)
    .post(`/api/notifications`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(notification);

  t.is(post.status, 201, post.body.message);
});

test('subscribe to notifications', async (t) => {
  const payload = {
    query: `
      subscription Notifications {
        newNotifications(topic: "NOTIFICATIONS") {
          id
          message
        }
      }
    `,
  };

  const post = await request(t.context.server.listener)
    .post(`/graphql`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .set('Accept', 'application/json')
    .send(payload);

  t.is(post.status, 200, post.body.message);
});
