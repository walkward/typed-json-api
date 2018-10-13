import { Asset } from './Asset';
import { Collection } from './Collection';
import { Customer } from './Customer';
import { Folder } from './Folder';
import { Group } from './Group';
import { Project } from './Project';
import { User } from './User';

const entities: any = {
  asset: Asset,
  folder: Folder,
  project: Project,
  group: Group,
  collection: Collection,
  customer: Customer,
  user: User,
};

export default entities;
