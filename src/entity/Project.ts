import { IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Base } from './Base';
import { Customer } from './Customer';
import { Folder } from './Folder';
import { User } from './User';

@Entity()
export class Project extends Base {
  @Column({ length: 256 })
  @IsString()
  public name: string;

  @OneToOne((type) => Folder)
  @JoinColumn()
  public rootFolder: Folder;

  @ManyToOne((type) => User, (user) => user.projects)
  public user: User;

  @ManyToOne((type) => Customer, (customer) => customer.projects)
  public customer: Customer;
}
