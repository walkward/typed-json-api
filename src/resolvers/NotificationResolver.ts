import { Arg, Args, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Notification } from 'app/entity/Notification';
import { PaginationArgs } from 'app/resolvers/args';
import { NotificationInput } from 'app/resolvers/inputs';

@Resolver((of) => Notification)
export class NotificationResolver {
  @InjectRepository(Notification)
  private readonly notificationRepository: Repository<Notification>;

  @Query((returns) => Notification, { nullable: true })
  public notification(@Arg('notificationId') notificationId: string): Promise<Notification | undefined> {
    return this.notificationRepository.findOne(notificationId);
  }

  @Query((returns) => [Notification])
  public notifications(@Args() { skip, take }: PaginationArgs): Promise<Notification[]> {
    return this.notificationRepository.find({ skip, take });
  }

  @Mutation((returns) => Boolean)
  public async addNotification(
    @Arg('notification') notificationInput: NotificationInput,
    @PubSub() pubSub: PubSubEngine,
  ): Promise<boolean> {
    const notification = this.notificationRepository.create({ ...notificationInput });
    await this.notificationRepository.save(notification);
    await pubSub.publish(notification.topic, notification);
    return true;
  }

  @Subscription({
    topics: ({ args }) => args.topic,
  })
  public newNotification(
    @Arg('topic') topic: string,
    @Root() notification: Notification,
  ): Notification {
    return notification;
  }
}
