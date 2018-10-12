import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";

import { Base } from './Base'
import { Customer } from './Customer'
// import { User } from './User'
import { Folder } from './Folder'

@Entity()
export class Project extends Base {
    @Column()
    name: string;

    @OneToOne(type => Folder)
    @JoinColumn()
    rootFolder: Folder;

    @ManyToOne(type => Customer, customer => customer.projects)
    customer: Customer;
}
