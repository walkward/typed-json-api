import { Entity, Column, ManyToMany, ManyToOne, OneToMany, JoinTable } from "typeorm";

import { Base } from './Base'
import { Collection } from './Collection'
import { User } from './User'
import { Customer } from './Customer'

@Entity()
export class Group extends Base {
    @Column()
    name: string;

    @OneToMany(type => Collection, collection => collection.group)
    collections: Collection[];

    @ManyToMany(type => User, user => user.groups)
    @JoinTable()
    users: User[];

    @ManyToOne(type => Customer, customer => customer.groups)
    customer: Customer;
}
