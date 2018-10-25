import { IsString } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
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

  @Field((type) => [Collection], { nullable: true })
  @OneToMany((type) => Collection, (collection) => collection.folder)
  public collections: Collection[];

  @Field((type) => Project, { nullable: true })
  @OneToOne((type) => Project)
  public project: Project;
  @Field()
  public projectId: string;

  @Field((type) => [Folder], { nullable: true })
  @TreeChildren({ cascade: true })
  public children: Folder[];

  @Field((type) => Folder, { nullable: true })
  @TreeParent()
  public parent: Folder;
  @Field()
  public parentId: string;

  @Field((type) => Int)
  public childCount: number;

  @Field((type) => [Asset], { nullable: true })
  @OneToMany((type) => Asset, (asset) => asset.folder)
  public assets: Asset[];
}
