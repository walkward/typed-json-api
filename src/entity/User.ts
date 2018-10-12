import { Entity, Column, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { IsString, IsEmail, Length, IsAlpha, Matches } from "class-validator";

import { Base } from './Base'
import { Customer } from './Customer'
import { Group } from './Group'
import { Collection } from './Collection'

@Entity()
export class User extends Base {
    @Column({ length: 100 })
    @IsAlpha()
    firstname: string;

    @Column({ length: 100 })
    @IsAlpha()
    lastname: string;

    @Column({
      type: "varchar",
      length: 100,
      unique: true,
    })
    @IsEmail()
    email: string;

    @Column({ length: 100 })
    @IsString()
    @Length(8, 100)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'gm', {
      message: "Passwords must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and must have at least 8 characters."
    })
    password: string;

    @Column({
      type: "varchar",
      length: 100,
      unique: true,
    })
    @Length(6, 100)
    login: string;

    @ManyToMany(type => Group, group => group.collections)
    groups: Group[];

    @ManyToOne(type => Customer, customer => customer.users)
    customer: Customer;

    @OneToMany(type => Collection, collection => collection.user)
    collections: Collection[];
}
