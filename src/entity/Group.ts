import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Collection } from './Collection';
import { Customer } from './Customer';
import { User } from './User';

@Entity()
@ObjectType()
export class Group extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Field((type) => Collection)
  @OneToMany((type) => Collection, (collection) => collection.group)
  public collections: Collection[];

  @Field((type) => [User])
  @ManyToMany((type) => User, (user) => user.groups)
  @JoinTable()
  public users: User[];

  @Field((type) => Customer)
  @ManyToOne((type) => Customer, (customer) => customer.groups)
  public customer: Customer;
}
