import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Notification } from 'app/entity/Notification';

@Resolver(Notification)
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
}
