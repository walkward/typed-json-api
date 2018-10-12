import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import { Base } from './Base'
import { Asset } from './Asset'
import { Collection } from './Collection'

@Entity()
export class Folder extends Base {
    @Column()
    name: string;

    @OneToMany(type => Collection, collection => collection.folder)
    collections: Collection[];

    @ManyToOne(type => Folder, folder => folder.folders)
    folder: Folder;

    @OneToMany(type => Folder, folder => folder.folder)
    folders: Folder[];

    @OneToMany(type => Asset, asset => asset.folder)
    assets: Asset[];
}
