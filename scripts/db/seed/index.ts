import * as TypeORM from 'typeorm';

import * as config from '../../../src/config';
import * as entities from '../../../src/entity';
import Seeds from '../../../src/utils/seeds';
import { done } from '../../helpers';

export async function seed({ seedMultiplier }: { seedMultiplier: number }) {
  try {
    const seeds = new Seeds(0);

    const count: any = {
      customers: 1,
      users: 5 * seedMultiplier,
      groups: 10 * seedMultiplier,
      projects: 20 * seedMultiplier,
      folders: 20 * seedMultiplier,
      subFolders: 80 * seedMultiplier,
      subSubFolders: 320 * seedMultiplier,
      personalCollections: 40 * seedMultiplier,
      groupCollections: 40 * seedMultiplier,
      projectCollections: 40 * seedMultiplier,
      assets: 3000 * seedMultiplier,
      notifications: 5 * seedMultiplier,
    };

    // Creating connection with DB
    const databaseConfigs = config.databaseConfigs();
    const connection = await TypeORM.createConnection(databaseConfigs);
    const manager = connection.createEntityManager();

    const customers = await manager.create(entities.Customer, Array(count.customers).fill(null).map((o, i) => ({
      name: seeds.companyName(),
    } as entities.Customer)));

    await manager.save(customers);

    const groups = await manager.create(entities.Group, Array(count.groups).fill(null).map((o, i) => ({
      name: seeds.title(),
      customer: seeds.pickone(customers),
    } as entities.Group)));

    await manager.save(groups);

    const projects = await manager.create(entities.Project, Array(count.projects).fill(null).map(() => ({
      name: seeds.title(),
      customer: seeds.pickone(customers),
    } as entities.Project)));

    const users = await manager.create(entities.User, Array(count.users).fill(null).map((o, i) => ({
      firstname: seeds.first(),
      lastname: seeds.last(),
      email: seeds.email(),
      password: 'TEST',
      login: seeds.twitter(),
      customer: seeds.pickone(customers),
      groups: seeds.pickset(groups),
    } as entities.User)));

    await Promise.all([
      manager.save(projects),
      manager.save(users),
    ]);

    const folders = await manager.create(entities.Folder, Array(count.folders).fill(null).map((o, i) => ({
      name: seeds.title(),
      project: projects[i],
    } as entities.Folder)));

    await manager.save(folders);

    const subFolders = await manager.create(entities.Folder, Array(count.subFolders).fill(null).map((o, i) => ({
      name: seeds.title(),
      parent: seeds.pickone(folders),
    } as entities.Folder)));

    await manager.save(subFolders);

    const subSubFolders = await manager.create(entities.Folder, Array(count.subSubFolders).fill(null).map((o, i) => ({
      name: seeds.title(),
      parent: seeds.pickone(subFolders),
    } as entities.Folder)));

    await manager.save(subSubFolders);

    const personalCollections = await manager.create(entities.Collection, Array(count.personalCollections).
    fill(null).map((o, i) => ({
      name: seeds.title(),
      user: seeds.pickone(users),
    } as entities.Collection)));

    const groupCollections = await manager.create(entities.Collection, Array(count.groupCollections)
    .fill(null).map((o, i) => ({
      name: seeds.title(),
      group: seeds.pickone(groups),
    } as entities.Collection)));

    const projectCollections = await manager.create(entities.Collection, Array(count.projectCollections)
    .fill(null).map((o, i) => ({
      name: seeds.title(),
      folder: seeds.pickone(folders),
    } as entities.Collection)));

    await Promise.all([
      manager.save(personalCollections),
      manager.save(groupCollections),
      manager.save(projectCollections),
    ]);

    const assets = await manager.create(entities.Asset, Array(count.assets).fill(null).map((o, i) => ({
      name: seeds.title(),
      location: seeds.url(),
      fileType: 'png' as entities.FileTypes,
      success: seeds.bool(),
      collections: seeds.pickset([
        ...personalCollections,
        ...groupCollections,
        ...projectCollections,
      ], seeds.randomCount(0, 3)),
      folder: seeds.pickone([
        ...folders,
        ...subFolders,
        ...subSubFolders,
      ]),
    } as entities.Asset)));

    await manager.save(assets);

    const notifications = await manager.create(entities.Notification, Array(count.notifications)
      .fill(null).map((o, i) => (seeds.pickone([{
        message: `${seeds.pickone(users).firstname} completed approvals for ${seeds.pickone(projectCollections).name}`,
        topic: 'APPROVAL',
      }, {
        message: `${seeds.pickone(users).firstname} commented on asset ${seeds.pickone(assets).name}`,
        topic: 'ASSET',
      }, {
        message: `${seeds.pickone(users).firstname} was added to group ${seeds.pickone(groups).name}`,
        topic: 'GROUP',
      }, {
        message: `${seeds.pickone(users).firstname} requested permissions for project ${seeds.pickone(projects).name}`,
        topic: 'CUSTOMER',
      }]) as entities.Notification)));

    await manager.save(notifications);

    done('Successfully seeded db');
  } catch (error) {
    throw error;
  }
}
