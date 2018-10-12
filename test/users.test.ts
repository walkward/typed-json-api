/**
 * Testing user methods
 */

import test from 'ava';
import * as request from 'supertest';
import { Serializer } from 'jsonapi-serializer';

import { makeServer } from './helpers';

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test('create user', async (t) => {
  const user = {
    email: "example@email.com",
    login: "some_login_string",
    password: "Password123!",
    firstname: "Sandro",
    lastname: "Munda",
  }

  const data = new Serializer('users', { attributes: Object.keys(user) }).serialize(user);
  const postUser = await request(t.context.server.listener).post('/api/users').send(data);
  t.is(postUser.status, 201, postUser.body.message);

  const userId = postUser.body.data.id;
  const getUser = await request(t.context.server.listener).get(`/api/users/${userId}?page%5Bsize%5D=25`);
  t.is(getUser.status, 200, getUser.body.message);

  const updated = Object.assign({}, user, { firstname: 'Todd' })
  const updatedData = new Serializer('users', { attributes: Object.keys(updated) }).serialize(updated);
  const updateUser = await request(t.context.server.listener).put(`/api/users/${userId}`).send(updatedData);
  t.is(updateUser.status, 200, updateUser.body.message);

  const deleteUser = await request(t.context.server.listener).delete(`/api/users/${userId}`);
  t.is(deleteUser.status, 200, deleteUser.body.message);
});
