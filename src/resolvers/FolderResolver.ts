import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository, TreeRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Folder } from 'app/entity/Folder';
import { PaginationArgs } from 'app/resolvers/args';
import { FolderInput } from 'app/resolvers/inputs';

@Resolver((of) => Folder)
export class FolderResolver {
  @InjectRepository(Folder)
  private readonly folderRepository: Repository<Folder>;

  @InjectRepository(Folder)
  private readonly folderTreeRepository: TreeRepository<Folder>;

  @Query((returns) => Folder, { nullable: true })
  public folder(@Arg('folderId') folderId: string): Promise<Folder | undefined> {
    return this.folderRepository.findOne(folderId);
  }

  @Query((returns) => [Folder])
  public folders(@Args() { skip, take }: PaginationArgs): Promise<Folder[]> {
    return this.folderRepository.find({ skip, take });
  }

  @Mutation((returns) => Folder)
  public addFolder(@Arg('folder') folderInput: FolderInput): Promise<Folder> {
    const folder = this.folderTreeRepository.create({ ...folderInput });
    return this.folderTreeRepository.save(folder);
  }

  @FieldResolver()
  public childCount(@Root() folder: Folder): Promise<number> {
    return this.folderTreeRepository.countDescendants(folder);
  }

  @FieldResolver()
  public children(
    @Root() folder: Folder,
    @Args() { skip, take }: PaginationArgs,
  ): Promise<Folder[]> {
    return this.folderRepository.find({
      where: { parentId: folder.id },
      skip,
      take,
    });
  }

  @FieldResolver()
  public async parent(@Root() folder: Folder): Promise<Folder> {
    return (await this.folderRepository.findOne(folder.parentId))!;
  }
}
