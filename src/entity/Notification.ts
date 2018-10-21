import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Base } from './Base';

@Entity()
@ObjectType()
export class Notification extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public message: string;
}
