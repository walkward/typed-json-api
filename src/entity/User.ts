import { IsAlpha, IsEmail, IsString, Length, Matches } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Collection } from './Collection';
import { Customer } from './Customer';
import { Group } from './Group';
import { Project } from './Project';

@Entity()
@ObjectType()
export class User extends Base {
  @Field()
  @Column({ length: 100 })
  @IsAlpha()
  public firstname: string;

  @Field()
  @Column({ length: 100 })
  @IsAlpha()
  public lastname: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @IsEmail()
  public email: string;

  @Field()
  @Column({ length: 100 })
  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'gm', {
    message: 'Passwords must contain at least 1 uppercase letter, 1 lowercase letter, ' +
      '1 number and must have at least 8 characters.',
  })
  public password: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @Length(6, 100)
  public login: string;

  @Field((type) => [Group])
  @ManyToMany((type) => Group, (group) => group.collections)
  public groups: Group[];

  @Field((type) => Customer)
  @ManyToOne((type) => Customer, (customer) => customer.users)
  public customer: Customer;

  @Field((type) => [Collection])
  @OneToMany((type) => Collection, (collection) => collection.user)
  public collections: Collection[];

  @Field((type) => [Project])
  @OneToMany((type) => Project, (project) => project.customer)
  public projects: Project[];
}
