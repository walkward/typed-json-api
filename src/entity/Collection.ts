import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { RelationColumn } from 'app/helpers';
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

  @Field((type) => [Asset], { nullable: true })
  @ManyToMany((type) => Asset, (asset) => asset.collections)
  @JoinTable()
  public assets: Asset[];

  @Field((type) => Folder, { nullable: true })
  @ManyToOne((type) => Folder, (folder) => folder.collections)
  public folder: Folder;
  @RelationColumn()
  public folderId: string;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.collections)
  public user: User;
  @RelationColumn()
  public userId: string;

  @Field((type) => Group, { nullable: true })
  @ManyToOne((type) => Group, (group) => group.collections)
  public group: Group;
  @RelationColumn()
  public groupId: string;
}
