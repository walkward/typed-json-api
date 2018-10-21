import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

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
  public rootFolder: Folder;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.projects)
  public user: User;

  @Field((type) => Customer)
  @ManyToOne((type) => Customer, (customer) => customer.projects)
  public customer: Customer;
}
