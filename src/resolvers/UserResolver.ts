import {
  Arg, Args, Authorized, FieldResolver, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Collection, Customer, Group, Notification, Project } from 'app/entity';
import { User } from 'app/entity/User';
import { PaginationArgs } from 'app/resolvers/args';
import { NotificationInput, UserInput } from 'app/resolvers/inputs';

@Resolver((of) => User)
export class UserResolver {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  @InjectRepository(Group)
  private readonly groupRepository: Repository<Group>;

  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectRepository(Collection)
  private readonly collectionRepository: Repository<Collection>;

  @Query((returns) => User, { nullable: true })
  public user(@Arg('userId') userId: string): Promise<User | undefined> {
    return this.userRepository.findOne(userId);
  }

  @Authorized('ADMIN')
  @Query((returns) => [User])
  public users(@Args() { skip, take }: PaginationArgs): Promise<User[]> {
    return this.userRepository.find({ skip, take });
  }

  @Mutation((returns) => User)
  public addUser(
    @Arg('user') userInput: UserInput,
    @PubSub() pubSub: Publisher<NotificationInput>,
    ): Promise<User> {
    const user = this.userRepository.create({ ...userInput });

    pubSub({
      topic: `USERS:${user.customerId}`,
      message: `User ${user.firstname} ${user.lastname} was created`,
    } as NotificationInput);

    return this.userRepository.save(user);
  }

  @FieldResolver()
  public async customer(@Root() user: User): Promise<Customer> {
    return (await this.customerRepository.findOne(user.customerId))!;
  }

  @FieldResolver()
  public groups(
    @Root() user: User,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Group[]> {
    return this.groupRepository.find({
      skip,
      take,
      where: { userId: user.id },
    });
  }

  @FieldResolver()
  public projects(
    @Root() user: User,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Project[]> {
    return this.projectRepository.find({
      skip,
      take,
      where: { userId: user.id },
    });
  }

  @FieldResolver()
  public collections(
    @Root() user: User,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Collection[]> {
    return this.collectionRepository.find({
      skip,
      take,
      where: { userId: user.id },
    });
  }

  @Subscription({
    topics: ({ args }) => args.topic,
  })
  public userSubscription(
    @Arg('topic') topic: string,
    @Root() notification: Notification,
  ): Notification {
    return notification;
  }
}
