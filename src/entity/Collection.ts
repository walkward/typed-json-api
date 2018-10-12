import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import { Base } from './Base'
import { Group } from './Group'
import { User } from './User'
import { Folder } from './Folder'
import { Asset } from './Asset'

@Entity()
export class Collection extends Base {
    @Column()
    name: string;

    @ManyToMany(type => Asset, asset => asset.collections)
    @JoinTable()
    assets: Asset[];

    @ManyToOne(type => Folder, folder => folder.collections)
    folder: Folder;

    @ManyToOne(type => User, user => user.collections)
    user: User;

    @ManyToOne(type => Group, group => group.collections)
    group: Group;
}
