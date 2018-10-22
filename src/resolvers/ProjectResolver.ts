import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Project } from 'app/entity/Project';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  @Query((returns) => Project, { nullable: true })
  public project(@Arg('projectId', (type) => Int) projectId: number) {
    return this.projectRepository.findOne(projectId);
  }

  @Query((returns) => [Project])
  public projects(): Promise<Project[]> {
    return this.projectRepository.find();
  }
}
