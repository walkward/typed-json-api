import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Collection, Customer, Group, User } from 'app/entity';
import { PaginationArgs } from 'app/resolvers/args';
import { GroupInput } from 'app/resolvers/inputs';

@Resolver((of) => Group)
export class GroupResolver {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Group)
  private readonly groupRepository: Repository<Group>;

  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  @InjectRepository(Collection)
  private readonly collectionRepository: Repository<Collection>;

  @Query((returns) => Group, { nullable: true })
  public group(@Arg('groupId') groupId: string): Promise<Group | undefined> {
    return this.groupRepository.findOne(groupId);
  }

  @Query((returns) => [Group])
  public groups(@Args() { skip, take }: PaginationArgs): Promise<Group[]> {
    return this.groupRepository.find({ skip, take });
  }

  @Mutation((returns) => Group)
  public addGroup(@Arg('group') groupInput: GroupInput): Promise<Group> {
    const group = this.groupRepository.create({ ...groupInput });
    return this.groupRepository.save(group);
  }

  @FieldResolver()
  public async customer(@Root() group: Group): Promise<Customer> {
    return (await this.customerRepository.findOne(group.customerId))!;
  }

  @FieldResolver()
  public collections(
    @Root() group: Group,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Collection[]> {
    return this.collectionRepository.find({
      skip,
      take,
      where: { groupId: group.id },
    });
  }

  @FieldResolver()
  public users(
    @Root() group: Group,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<User[]> {
    return this.userRepository.find({
      skip,
      take,
      where: { groupId: group.id },
      relations: ['groups'],
    });
  }
}
