import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Asset } from './Asset';
import { Base } from './Base';
import { Collection } from './Collection';

@Entity()
@ObjectType()
export class Folder extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Field((type) => [Collection])
  @OneToMany((type) => Collection, (collection) => collection.folder)
  public collections: Collection[];

  @Field((type) => Folder)
  @ManyToOne((type) => Folder, (folder) => folder.folders)
  public folder: Folder;

  @Field((type) => [Folder])
  @OneToMany((type) => Folder, (folder) => folder.folder)
  public folders: Folder[];

  @Field((type) => [Asset])
  @OneToMany((type) => Asset, (asset) => asset.folder)
  public assets: Asset[];
}
