import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Asset } from 'app/entity/Asset';

@Resolver((of) => Asset)
export class AssetResolver {
  constructor(
    @InjectRepository(Asset) private readonly assetRepository: Repository<Asset>,
  ) {}

  @Query((returns) => Asset, { nullable: true })
  public asset(@Arg('assetId', (type) => Int) assetId: number) {
    return this.assetRepository.findOne(assetId);
  }

  @Query((returns) => [Asset])
  public assets(): Promise<Asset[]> {
    return this.assetRepository.find();
  }
}
