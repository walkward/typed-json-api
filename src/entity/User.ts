import { IsAlpha, IsEmail, IsString, Length, Matches } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Collection } from './Collection';
import { Customer } from './Customer';
import { Group } from './Group';

@Entity()
export class User extends Base {
  @Column({ length: 100 })
  @IsAlpha()
  public firstname: string;

  @Column({ length: 100 })
  @IsAlpha()
  public lastname: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @IsEmail()
  public email: string;

  @Column({ length: 100 })
  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'gm', {
    message: 'Passwords must contain at least 1 uppercase letter, 1 lowercase letter,' +
      '1 number and must have at least 8 characters.',
  })
  public password: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @Length(6, 100)
  public login: string;

  @ManyToMany((type) => Group, (group) => group.collections)
  public groups: Group[];

  @ManyToOne((type) => Customer, (customer) => customer.users)
  public customer: Customer;

  @OneToMany((type) => Collection, (collection) => collection.user)
  public collections: Collection[];
}
