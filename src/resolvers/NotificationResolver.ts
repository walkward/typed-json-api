import { Arg, Int, Mutation, PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Notification } from 'app/entity/Notification';
import { NotificationInput } from 'app/resolvers/inputs';

@Resolver((of) => Notification)
export class NotificationResolver {
  constructor(
    @InjectRepository(Notification) private readonly notificationRepository: Repository<Notification>,
  ) {}

  @Query((returns) => Notification, { nullable: true })
  public notification(@Arg('notificationId', (type) => Int) notificationId: number) {
    return this.notificationRepository.findOne(notificationId);
  }

  @Query((returns) => [Notification])
  public notifications(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  @Mutation((returns) => Notification)
  public async addNotification(
    @Arg('notification') notificationInput: NotificationInput,
    @Arg('topic') topic: string,
    @PubSub() pubSub: PubSubEngine,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...notificationInput,
    });

    await this.notificationRepository.save(notification);
    pubSub.publish(topic, notification);
    return notification;
  }

  @Subscription({
    topics: ({ args }) => args.topic,
  })
  public newNotification(
    @Arg('topic') topic: string,
    @Root() notificationPayload: Notification,
  ): Notification {
    return notificationPayload;
  }
}
