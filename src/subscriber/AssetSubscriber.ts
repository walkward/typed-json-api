import { Asset } from 'app/entity';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

@EventSubscriber()
export class AssetSubscriber implements EntitySubscriberInterface<Asset> {
  // Indicates that this subscriber only listen to Post events.
  public listenTo() {
    return Asset;
  }

  public afterInsert(event: InsertEvent<Asset>) {
    // console.log(`After asset inserted: `, event.entity);
  }
}
