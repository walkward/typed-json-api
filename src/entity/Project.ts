import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { Base } from './Base';
import { Customer } from './Customer';
// import { User } from './User'
import { Folder } from './Folder';

@Entity()
export class Project extends Base {
  @Column()
  public name: string;

  @OneToOne((type) => Folder)
  @JoinColumn()
  public rootFolder: Folder;

  @ManyToOne((type) => Customer, (customer) => customer.projects)
  public customer: Customer;
}
