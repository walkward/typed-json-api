import { IsBoolean, IsEnum, IsString, IsUrl } from 'class-validator';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { RelationColumn } from 'app/helpers';
import { Base } from './Base';
import { Collection } from './Collection';
import { Folder } from './Folder';

export enum FileTypes {
  jpg = 'jpg',
  png = 'png',
  gif = 'gif',
}

registerEnumType(FileTypes, {
  name: 'FileTypes',
  description: 'Acceptable file type extensions',
});

@Entity()
@ObjectType()
export class Asset extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Field()
  @Column({ length: 2000 })
  @IsUrl()
  public location: string;

  @Field((type) => FileTypes)
  @Column({ length: 256 })
  @IsEnum(FileTypes)
  public fileType: FileTypes;

  @Field()
  @Column({ default: false })
  @IsBoolean()
  public success: boolean;

  @Field((type) => [Collection])
  @ManyToMany((type) => Collection, (collection) => collection.assets)
  public collections: Collection[];

  @Field((type) => Folder)
  @ManyToOne((type) => Folder, (folder) => folder.assets)
  public folder: Folder;
  @RelationColumn()
  public folderId: string;
}
