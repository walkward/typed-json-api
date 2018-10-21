import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Group } from './Group';
import { Project } from './Project';
import { User } from './User';

@Entity()
@ObjectType()
export class Customer extends Base {
  @Field()
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @Field((type) => [User])
  @OneToMany((type) => User, (user) => user.customer)
  public users: User[];

  @Field((type) => [Group])
  @OneToMany((type) => Group, (group) => group.customer)
  public groups: Group[];

  @Field((type) => [Project])
  @OneToMany((type) => Project, (project) => project.customer)
  public projects: Project[];
}
