import { Entity, Column, ManyToMany, ManyToOne } from "typeorm";

import { Base } from './Base'
import { Collection } from './Collection'
import { Folder } from './Folder'

@Entity()
export class Asset extends Base {
    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    fileType: string;

    @Column()
    success: boolean;

    @ManyToMany(type => Collection, collection => collection.assets)
    collections: Collection[];

    @ManyToOne(type => Folder, folder => folder.folders)
    folder: Folder;
}
