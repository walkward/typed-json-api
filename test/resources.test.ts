/**
 * Testing resource rest methods
 */

require('dotenv').config() // tslint:disable-line

import test from 'ava';
import * as Chance from 'chance';
import { Serializer } from 'jsonapi-serializer';
import * as request from 'supertest';

import { authenticate } from '../src/utils/auth';
import { makeServer } from './helpers';

const chance = new Chance();

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
  t.context.token = authenticate();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test('create user', async (t) => {
  const user = {
    email: chance.email(),
    login: chance.word(),
    password: 'Password123!',
    firstname: chance.first(),
    lastname: chance.last(),
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

test('get users', async (t) => {
  const getUsers = await request(t.context.server.listener)
    .get(`/api/users?sort=name,stuff`)
    .set('Authorization', `Bearer ${t.context.token}`);
  t.is(getUsers.status, 200, getUsers.body.message);
});

test('create customer', async (t) => {
  const type = 'customers';
  const document = {
    name: chance.word(),
  };

  const data = new Serializer(type, { attributes: Object.keys(document) }).serialize(document);
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test('create customer', async (t) => {
  const type = 'customers';
  const document = {
    name: chance.word(),
  };

  const data = new Serializer(type, { attributes: Object.keys(document) }).serialize(document);
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test('create group', async (t) => {
  const type = 'groups';
  const document = {
    name: chance.word(),
  };

  const data = new Serializer(type, { attributes: Object.keys(document) }).serialize(document);
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test('create folder', async (t) => {
  const type = 'folders';
  const document = {
    name: chance.word(),
  };

  const data = new Serializer(type, { attributes: Object.keys(document) }).serialize(document);
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test('create collection', async (t) => {
  const type = 'collections';
  const document = {
    name: chance.word(),
  };

  const data = new Serializer(type, { attributes: Object.keys(document) }).serialize(document);
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test.skip('create asset', async (t) => {
  const type = 'assets';
  const document = {
    fileType: 'jpeg',
    location: chance.domain(),
    name: chance.word(),
    success: true,
  };

  const data = new Serializer(type, {
    keyForAttribute: 'camelCase',
    attributes: Object.keys(document),
  }).serialize(document);

  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});
