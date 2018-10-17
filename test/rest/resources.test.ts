/**
 * Testing resource rest methods
 */

require('dotenv').config() // tslint:disable-line

import test from 'ava';
import * as Chance from 'chance';
import * as request from 'supertest';

import { authenticate } from '../../utils/auth';
import { deserialize, serialize } from '../../utils/json';
import { makeServer } from '../helpers';

const chance = new Chance();

test.beforeEach(async (t) => {
  t.context.server = await makeServer();
  t.context.token = authenticate();
});

test.afterEach(async (t) => {
  await t.context.server.stop();
});

test.skip('create resources', async (t) => {
  const customer = serialize('customers', {
    name: chance.word(),
  }, {
    attributes: ['name'],
  });

  const createCustomer = await request(t.context.server.listener)
    .post(`/api/customers`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(customer);

  t.is(createCustomer.status, 201, createCustomer.body.message);

  const customerId = await deserialize('customers', createCustomer.body).then(({id}) => id);

  const project = serialize('projects', {
    name: chance.word(),
    customer: {
      id: customerId,
    },
  }, {
    attributes: ['name', 'customer'],
    customer: {
      ref: 'id',
      included: false,
    },
  });

  const createProject = await request(t.context.server.listener)
    .post(`/api/projects`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(project);

  t.is(createProject.status, 201, createProject.body.message);

  // const projectId = await deserialize('projects', createProject.body).then(({id}) => id);

  const user = serialize('users', {
    email: chance.email(),
    login: chance.word(),
    password: 'Password123!',
    firstname: chance.first(),
    lastname: chance.last(),
    customer: {
      id: customerId,
    },
  }, {
    attributes: ['customer', 'email', 'login', 'password', 'firstname', 'lastname'],
    customer: {
      ref: 'id',
      included: false,
    },
  });

  const createUser = await request(t.context.server.listener)
    .post(`/api/users`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(user);

  t.is(createUser.status, 201, createUser.body.message);

  const userId = await deserialize('users', createUser.body).then(({id}) => id);

  const collection = serialize('collections', {
    name: chance.word(),
    user: {
      id: userId,
    },
  }, {
    attributes: ['name', 'user'],
    user: {
      ref: 'id',
      included: false,
    },
  });

  const createCollection = await request(t.context.server.listener)
    .post(`/api/collections`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(collection);

  t.is(createCollection.status, 201, createCollection.body.message);

  const collectionId = await deserialize('collections', createCollection.body).then(({id}) => id);

  const asset = serialize('assets', {
    fileType: 'jpg',
    location: chance.domain(),
    name: chance.word(),
    success: true,
    collections: {
      id: collectionId,
    },
  }, {
    attributes: ['name', 'collections', 'fileType', 'location', 'success'],
    collections: {
      ref: 'id',
      included: false,
    },
  });

  const createAsset = await request(t.context.server.listener)
    .post(`/api/assets`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(asset);

  t.is(createAsset.status, 201, createAsset.body.message);
});

test.skip('create user', async (t) => {
  const user = {
    email: chance.email(),
    login: chance.word(),
    password: 'Password123!',
    firstname: chance.first(),
    lastname: chance.last(),
  };

  const data = serialize('users', user, { attributes: Object.keys(user) });
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
  const updatedData = serialize('users', user, { attributes: Object.keys(updated) });
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

test.skip('get users', async (t) => {
  const getUsers = await request(t.context.server.listener)
    .get(`/api/users?sort=name,stuff`)
    .set('Authorization', `Bearer ${t.context.token}`);
  t.is(getUsers.status, 200, getUsers.body.message);
});

test.skip('create customer', async (t) => {
  const type = 'projects';
  const document = {
    name: chance.word(),
  };

  const data = serialize(type, document, { attributes: Object.keys(document) });
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test.skip('create group', async (t) => {
  const type = 'groups';
  const document = {
    name: chance.word(),
  };

  const data = serialize(type, document, { attributes: Object.keys(document) });
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test.skip('create folder', async (t) => {
  const type = 'folders';
  const document = {
    name: chance.word(),
  };

  const data = serialize(type, document, { attributes: Object.keys(document) });
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test.skip('create collection', async (t) => {
  const type = 'collections';
  const document = {
    name: chance.word(),
  };

  const data = serialize(type, document, { attributes: Object.keys(document) });
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});

test.skip('create asset', async (t) => {
  const type = 'assets';
  const document = {
    fileType: 'jpg',
    location: chance.domain(),
    name: chance.word(),
    success: true,
  };

  const data = serialize(type, document, { attributes: Object.keys(document) });
  const post = await request(t.context.server.listener)
    .post(`/api/${type}`)
    .set('Authorization', `Bearer ${t.context.token}`)
    .send(data);

  t.is(post.status, 201, post.body.message);
});
