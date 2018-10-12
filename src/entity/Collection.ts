import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { Asset } from './Asset';
import { Base } from './Base';
import { Folder } from './Folder';
import { Group } from './Group';
import { User } from './User';

@Entity()
export class Collection extends Base {
  @Column()
  public name: string;

  @ManyToMany((type) => Asset, (asset) => asset.collections)
  @JoinTable()
  public assets: Asset[];

  @ManyToOne((type) => Folder, (folder) => folder.collections)
  public folder: Folder;

  @ManyToOne((type) => User, (user) => user.collections)
  public user: User;

  @ManyToOne((type) => Group, (group) => group.collections)
  public group: Group;
}
