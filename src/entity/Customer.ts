import { IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from './Base';
import { Group } from './Group';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class Customer extends Base {
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @OneToMany((type) => User, (user) => user.customer)
  public users: User[];

  @OneToMany((type) => Group, (group) => group.customer)
  public groups: Group[];

  @OneToMany((type) => Project, (project) => project.customer)
  public projects: Project[];
}
