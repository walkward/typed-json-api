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

test('customer mutation', async (t) => {
  const payload = {
    query: `
      mutation AddCustomer {
        addCustomer(customer: {
          name: "New Customer"
        }) {
          id
          name
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
