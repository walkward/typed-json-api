import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, OneToOne, Tree, TreeChildren, TreeParent } from 'typeorm';

import { Asset } from './Asset';
import { Base } from './Base';
import { Collection } from './Collection';
import { Project } from './Project';

@Entity()
@Tree('closure-table')
@ObjectType()
export class Folder extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Field((type) => [Collection])
  @OneToMany((type) => Collection, (collection) => collection.folder)
  public collections: Collection[];

  // @Field((type) => Folder)
  // @ManyToOne((type) => Folder, (folder) => folder.folders)
  // public folder: Folder;

  // @Field((type) => [Folder])
  // @OneToMany((type) => Folder, (folder) => folder.folder)
  // public folders: Folder[];

  @Field((type) => Project)
  @OneToOne((type) => Project)
  public project: Project;

  @TreeChildren({ cascade: true })
  public children: Folder[];

  @TreeParent()
  public parent: Folder;

  @Field((type) => [Asset])
  @OneToMany((type) => Asset, (asset) => asset.folder)
  public assets: Asset[];
}
