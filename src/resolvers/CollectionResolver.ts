import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Asset, Collection, Folder, Group, User } from 'app/entity';
import { PaginationArgs } from 'app/resolvers/args';
import { CollectionInput } from 'app/resolvers/inputs';

@Resolver((of) => Collection)
export class CollectionResolver {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Collection)
  private readonly collectionRepository: Repository<Collection>;

  @InjectRepository(Asset)
  private readonly assetRepository: Repository<Asset>;

  @InjectRepository(Group)
  private readonly groupRepository: Repository<Group>;

  @InjectRepository(Folder)
  private readonly folderRepository: Repository<Folder>;

  @Query((returns) => Collection, { nullable: true })
  public collection(@Arg('collectionId') collectionId: string): Promise<Collection | undefined> {
    return this.collectionRepository.findOne(collectionId);
  }

  @Query((returns) => [Collection])
  public collections(@Args() { skip, take }: PaginationArgs): Promise<Collection[]> {
    return this.collectionRepository.find({ skip, take });
  }

  @Mutation((returns) => Collection)
  public addCollection(@Arg('collection') collectionInput: CollectionInput): Promise<Collection> {
    const collection = this.collectionRepository.create({ ...collectionInput });
    return this.collectionRepository.save(collection);
  }

  @FieldResolver()
  public async assets(
    @Root() collection: Collection,
    @Args() { skip, take }: PaginationArgs,
  ) {
    return this.assetRepository.find({
      skip,
      take,
      where: { collectionId: collection.id },
      relations: ['collections'],
    });
  }

  @FieldResolver()
  public async user(@Root() collection: Collection): Promise<User | undefined> {
    return collection.userId ? this.userRepository.findOne(collection.userId) : undefined;
  }

  @FieldResolver()
  public async group(@Root() collection: Collection): Promise<Group | undefined> {
    return collection.groupId ? this.groupRepository.findOne(collection.groupId) : undefined;
  }

  @FieldResolver()
  public async folder(@Root() collection: Collection): Promise<Folder | undefined> {
    return collection.folderId ? this.folderRepository.findOne(collection.folderId) : undefined;
  }
}
