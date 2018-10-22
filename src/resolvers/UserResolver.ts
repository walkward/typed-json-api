import { Arg, Authorized, Int, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Notification } from 'app/entity/Notification';
import { User } from 'app/entity/User';
import { UserInput } from 'app/inputs/UserInput';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query((returns) => User, { nullable: true })
  public user(@Arg('userId', (type) => Int) userId: number) {
    return this.userRepository.findOne(userId);
  }

  @Authorized('ADMIN')
  @Query((returns) => [User])
  public users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation((returns) => User)
  public addUser(@Arg('user') userInput: UserInput): Promise<User> {
    const recipe = this.userRepository.create({
      ...userInput,
    });

    return this.userRepository.save(recipe);
  }

  @Subscription({
    topics: 'NOTIFICATIONS',
    filter: ({ payload, args }) => args.priorities.includes(payload.priority),
  })
  public newNotification(
    @Arg('topic') topic: string,
    @Root() notificationPayload: Notification,
  ): Notification {
    return { ...notificationPayload };
  }
}
