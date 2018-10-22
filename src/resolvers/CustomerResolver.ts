import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Customer } from 'app/entity/Customer';
import { CustomerInput } from 'app/inputs';

@Resolver((of) => Customer)
export class CustomerResolver {
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) {}

  @Query((returns) => Customer, { nullable: true })
  public customer(@Arg('customerId', (type) => Int) customerId: number) {
    return this.customerRepository.findOne(customerId);
  }

  @Query((returns) => [Customer])
  public customers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  @Mutation((returns) => Customer)
  public async addCustomer(
    @Arg('customer') customerInput: CustomerInput,
  ): Promise<Customer> {
    const customer = this.customerRepository.create({
      ...customerInput,
    });
    await this.customerRepository.save(customer);
    return customer;
  }
}
