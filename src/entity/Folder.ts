import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Asset } from './Asset';
import { Base } from './Base';
import { Collection } from './Collection';

@Entity()
export class Folder extends Base {
  @Column()
  public name: string;

  @OneToMany((type) => Collection, (collection) => collection.folder)
  public collections: Collection[];

  @ManyToOne((type) => Folder, (folder) => folder.folders)
  public folder: Folder;

  @OneToMany((type) => Folder, (folder) => folder.folder)
  public folders: Folder[];

  @OneToMany((type) => Asset, (asset) => asset.folder)
  public assets: Asset[];
}
