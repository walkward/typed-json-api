import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Group, Project, User } from 'app/entity';
import { Customer } from 'app/entity/Customer';
import { PaginationArgs } from 'app/resolvers/args';
import { CustomerInput } from 'app/resolvers/inputs';

@Resolver((of) => Customer)
export class CustomerResolver {
  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectRepository(Group)
  private readonly groupRepository: Repository<Group>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Query((returns) => Customer, { nullable: true })
  public customer(@Arg('customerId') customerId: string): Promise<Customer | undefined> {
    return this.customerRepository.findOne(customerId);
  }

  @Query((returns) => [Customer])
  public customers(@Args() { skip, take }: PaginationArgs): Promise<Customer[]> {
    return this.customerRepository.find({ skip, take });
  }

  @Mutation((returns) => Customer)
  public async addCustomer(@Arg('customer') customerInput: CustomerInput): Promise<Customer> {
    const customer = this.customerRepository.create({ ...customerInput });
    return this.customerRepository.save(customer);
  }

  @FieldResolver()
  public projects(
    @Root() customer: Customer,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Project[]> {
    return this.projectRepository.find({
      skip,
      take,
      where: { customerId: customer.id },
    });
  }

  @FieldResolver()
  public users(
    @Root() customer: Customer,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<User[]> {
    return this.userRepository.find({
      skip,
      take,
      where: { customerId: customer.id },
    });
  }

  @FieldResolver()
  public groups(
    @Root() customer: Customer,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Group[]> {
    return this.groupRepository.find({
      skip,
      take,
      where: { customerId: customer.id },
    });
  }
}
