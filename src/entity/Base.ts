import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  public sequence: number;

  @Column()
  @Generated('uuid')
  public id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public modified: Date;

  @VersionColumn({ type: 'int' })
  public version: number;
}
