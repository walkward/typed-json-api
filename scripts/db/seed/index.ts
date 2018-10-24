import * as Chance from 'chance';
import * as TypeORM from 'typeorm';

import * as config from '../../../src/config';
import * as entities from '../../../src/entity';
import { done } from '../../helpers';

export async function seed() {
  const chance = new Chance();

  // Get config
  const databaseConfigs = config.databaseConfigs();

  // Creating connection with DB
  const connection = await TypeORM.createConnection(databaseConfigs);

  const customers = await connection.createQueryBuilder()
    .insert()
    .into(entities.Customer)
    .values(Array(10).fill(null).map(() => ({
      name: chance.name(),
    })))
    .execute();

  const groups = await connection.createQueryBuilder()
    .insert()
    .into(entities.Group)
    .values(Array(10).fill(null).map(() => ({
      name: chance.name(),
      customer: chance.pickone(customers.raw as entities.Customer[]),
    })))
    .execute();

  const users = await connection.createQueryBuilder()
    .insert()
    .into(entities.User)
    .values(Array(10).fill(null).map(() => ({
      firstname: chance.first(),
      lastname: chance.last(),
      email: chance.email(),
      password: 'TEST',
      login: chance.twitter(),
      customer: chance.pickone(customers.raw as entities.Customer[]),
    })))
    .execute();

  const rootFolders = await connection.createQueryBuilder()
    .insert()
    .into(entities.Folder)
    .values(Array(10).fill(null).map((o, i) => ({
      name: chance.name(),
    })))
    .execute();

  await connection.createQueryBuilder()
    .insert()
    .into(entities.Project)
    .values(Array(10).fill(null).map((o, i) => ({
      name: chance.name(),
      customer: chance.pickone(customers.raw as entities.Customer[]),
      folder: rootFolders.raw[i],
    })))
    .execute();

  const folders = await connection.createQueryBuilder()
    .insert()
    .into(entities.Folder)
    .values(Array(10).fill(null).map((o, i) => ({
      name: chance.name(),
      parent: chance.pickone(rootFolders.raw as entities.Folder[]),
    })))
    .execute();

  const subFolders = await connection.createQueryBuilder()
    .insert()
    .into(entities.Folder)
    .values(Array(10).fill(null).map((o, i) => ({
      name: chance.name(),
      parent: chance.pickone(folders.raw as entities.Folder[]),
    })))
    .execute();

  await connection.createQueryBuilder()
    .insert()
    .into(entities.Folder)
    .values(Array(10).fill(null).map((o, i) => ({
      name: chance.name(),
      parent: chance.pickone(subFolders.raw as entities.Folder[]),
    })))
    .execute();

  const personalCollections = await connection.createQueryBuilder()
    .insert()
    .into(entities.Collection)
    .values(Array(10).fill(null).map(() => ({
      name: chance.name(),
      user: chance.pickone(users.raw as entities.User[]),
    })))
    .execute();

  const groupCollections = await connection.createQueryBuilder()
    .insert()
    .into(entities.Collection)
    .values(Array(10).fill(null).map(() => ({
      name: chance.name(),
      group: chance.pickone(groups.raw as entities.Group[]),
    })))
    .execute();

  const projectCollections = await connection.createQueryBuilder()
    .insert()
    .into(entities.Collection)
    .values(Array(10).fill(null).map(() => ({
      name: chance.name(),
      folder: chance.pickone(rootFolders.raw as entities.Folder[]),
    })))
    .execute();

  await connection.createQueryBuilder()
    .insert()
    .into(entities.Asset)
    .values(Array(10).fill(null).map(() => ({
      name: chance.name(),
      location: chance.url(),
      fileType: 'png' as entities.FileTypes,
      success: chance.bool(),
      collections: chance.pickset([
        ...personalCollections.raw,
        ...groupCollections.raw,
        ...projectCollections.raw,
      ]) as entities.Collection[],
      folder: chance.pickone([...rootFolders.raw, ...folders.raw] as entities.Folder[]),
    })))
    .execute();

  done('Successfully seeded db');
}
