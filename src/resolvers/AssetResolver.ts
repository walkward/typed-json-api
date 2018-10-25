import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Asset, Collection, Folder  } from 'app/entity';
import { PaginationArgs } from 'app/resolvers/args';
import { AssetInput } from 'app/resolvers/inputs';

@Resolver((of) => Asset)
export class AssetResolver {
  @InjectRepository(Asset)
  private readonly assetRepository: Repository<Asset>;

  @InjectRepository(Collection)
  private readonly collectionsRepository: Repository<Collection>;

  @InjectRepository(Folder)
  private readonly folderRepository: Repository<Folder>;

  @Query((returns) => Asset, { nullable: true })
  public asset(@Arg('assetId') assetId: string): Promise<Asset | undefined> {
    return this.assetRepository.findOne(assetId);
  }

  @Query((returns) => [Asset])
  public assets(@Args() { skip, take }: PaginationArgs): Promise<Asset[]> {
    return this.assetRepository.find({ skip, take });
  }

  @Mutation((returns) => Asset)
  public addAsset(@Arg('asset') assetInput: AssetInput): Promise<Asset> {
    const asset = this.assetRepository.create({ ...assetInput });
    return this.assetRepository.save(asset);
  }

  @FieldResolver()
  public async collections(
    @Root() asset: Asset,
    @Args() { skip, take }: PaginationArgs,
  ) {
    return this.collectionsRepository.find({
      skip,
      take,
      where: { assetId: asset.id },
      relations: ['assets'],
    });
  }

  @FieldResolver()
  public async folder(@Root() asset: Asset): Promise<Folder> {
    return (await this.folderRepository.findOne(asset.folderId))!;
  }
}
