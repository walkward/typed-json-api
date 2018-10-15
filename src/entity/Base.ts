import { IsDate, IsInt, IsUUID } from 'class-validator';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  public id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  public created: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  public modified: Date;

  @VersionColumn({ type: 'int' })
  @IsInt()
  public version: number;
}
