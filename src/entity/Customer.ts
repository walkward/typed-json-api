import { Entity, Column, OneToMany } from "typeorm";

import { Base } from './Base'
import { Project } from './Project'
import { Group } from './Group'
import { User } from './User'

@Entity()
export class Customer extends Base {
    @Column()
    name: string;

    @OneToMany(type => User, user => user.customer)
    users: User[];

    @OneToMany(type => Group, group => group.customer)
    groups: Group[];

    @OneToMany(type => Project, project => project.customer)
    projects: Project[];
}
