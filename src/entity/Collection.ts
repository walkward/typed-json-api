import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { Asset } from './Asset';
import { Base } from './Base';
import { Folder } from './Folder';
import { Group } from './Group';
import { User } from './User';

@Entity()
@ObjectType()
export class Collection extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Field((type) => [Asset])
  @ManyToMany((type) => Asset, (asset) => asset.collections)
  @JoinTable()
  public assets: Asset[];

  @Field((type) => Folder)
  @ManyToOne((type) => Folder, (folder) => folder.collections)
  public folder: Folder;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.collections)
  public user: User;

  @Field((type) => Group)
  @ManyToOne((type) => Group, (group) => group.collections)
  public group: Group;
}
