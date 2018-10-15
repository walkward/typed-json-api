import { IsBoolean, IsEnum, IsString, IsUrl } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { Base } from './Base';
import { Collection } from './Collection';
import { Folder } from './Folder';

enum FileTypes {
  jpg = 'jpg',
  png = 'png',
  gif = 'gif',
}

@Entity()
export class Asset extends Base {
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Column({ length: 2000 })
  @IsUrl()
  public location: string;

  @Column({ length: 256 })
  @IsEnum(FileTypes)
  public fileType: FileTypes;

  @Column({ default: false })
  @IsBoolean()
  public success: boolean;

  @ManyToMany((type) => Collection, (collection) => collection.assets)
  public collections: Collection[];

  @ManyToOne((type) => Folder, (folder) => folder.folders)
  public folder: Folder;
}
