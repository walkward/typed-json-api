/**
 * Testing user methods
 */

import test from 'ava';
import { Serializer } from 'jsonapi-serializer';
import * as request from 'supertest';

import { authenticate } from '../src/utils/auth';
import { makeServer } from './helpers';

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
  t.context.token = authenticate();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test('create user', async (t) => {
  const user = {
    email: 'example@email.com',
    login: 'some_login_string',
    password: 'Password123!',
    firstname: 'Sandro',
    lastname: 'Munda',
  };

  const data = new Serializer('users', { attributes: Object.keys(user) }).serialize(user);
  const postUser = await request(t.context.server.listener)
    .post('/api/users')
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);
  t.is(postUser.status, 201, postUser.body.message);

  const userId = postUser.body.data.id;
  const getUser = await request(t.context.server.listener)
    .get(`/api/users/${userId}`)
    .set('Authorization', `Bearer ${t.context.token}`);
  t.is(getUser.status, 200, getUser.body.message);

  const updated = Object.assign({}, user, { firstname: 'Todd' });
  const updatedData = new Serializer('users', { attributes: Object.keys(updated) }).serialize(updated);
  const updateUser = await request(t.context.server.listener)
    .put(`/api/users/${userId}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(updatedData);
  t.is(updateUser.status, 200, updateUser.body.message);

  const deleteUser = await request(t.context.server.listener)
  .delete(`/api/users/${userId}`)
  .set('Authorization', `Bearer ${t.context.token}`);
  t.is(deleteUser.status, 200, deleteUser.body.message);
});
