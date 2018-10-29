import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { RelationColumn } from 'app/helpers';
import { Base } from './Base';
import { Customer } from './Customer';
import { Folder } from './Folder';
import { User } from './User';

@Entity()
@ObjectType()
export class Project extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Field((type) => Folder)
  @OneToOne((type) => Folder)
  @JoinColumn()
  public folder: Folder;
  @RelationColumn()
  public folderId: string;

  // @Field((type) => [Folder])
  // @OneToMany((type) => Folder, (folder) => folder.folder)
  // public folders: Folder[];

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.projects)
  public user: User;
  @RelationColumn()
  public userId: string;

  @Field((type) => Customer, { nullable: true })
  @ManyToOne((type) => Customer, (customer) => customer.projects)
  public customer: Customer;
  @RelationColumn()
  public customerId: string;
}
