import { PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export abstract class Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    modified: Date;

    @VersionColumn({ type: 'int' })
    version: number;
}
