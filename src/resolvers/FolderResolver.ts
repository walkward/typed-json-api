import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Folder } from 'app/entity/Folder';

@Resolver((of) => Folder)
export class FolderResolver {
  constructor(
    @InjectRepository(Folder) private readonly folderRepository: Repository<Folder>,
  ) {}

  @Query((returns) => Folder, { nullable: true })
  public folder(@Arg('folderId', (type) => Int) folderId: number) {
    return this.folderRepository.findOne(folderId);
  }

  @Query((returns) => [Folder])
  public folders(): Promise<Folder[]> {
    return this.folderRepository.find();
  }
}
