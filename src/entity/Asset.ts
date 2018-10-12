import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { Collection } from './Collection';
import { Folder } from './Folder';

@Entity()
export class Asset extends Base {
  @Column()
  public name: string;

  @Column()
  public location: string;

  @Column()
  public fileType: string;

  @Column()
  public success: boolean;

  @ManyToMany((type) => Collection, (collection) => collection.assets)
  public collections: Collection[];

  @ManyToOne((type) => Folder, (folder) => folder.folders)
  public folder: Folder;
}
