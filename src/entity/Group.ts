import { IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Collection } from './Collection';
import { Customer } from './Customer';
import { User } from './User';

@Entity()
export class Group extends Base {
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @OneToMany((type) => Collection, (collection) => collection.group)
  public collections: Collection[];

  @ManyToMany((type) => User, (user) => user.groups)
  @JoinTable()
  public users: User[];

  @ManyToOne((type) => Customer, (customer) => customer.groups)
  public customer: Customer;
}
