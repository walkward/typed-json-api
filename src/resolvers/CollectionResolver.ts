import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Collection } from 'app/entity/Collection';

@Resolver(Collection)
export class CollectionResolver {
  constructor(
    @InjectRepository(Collection) private readonly collectionRepository: Repository<Collection>,
  ) {}

  @Query((returns) => Collection, { nullable: true })
  public collection(@Arg('collectionId', (type) => Int) collectionId: number) {
    return this.collectionRepository.findOne(collectionId);
  }

  @Query((returns) => [Collection])
  public collections(): Promise<Collection[]> {
    return this.collectionRepository.find();
  }
}
