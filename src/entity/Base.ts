import { IsDate, IsInt, IsOptional, IsUUID } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@ObjectType()
export abstract class Base {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  public id: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  @IsOptional()
  public created: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  @IsDate()
  @IsOptional()
  public modified: Date;

  @Field()
  @VersionColumn({ type: 'int' })
  @IsInt()
  @IsOptional()
  public version: number;
}
