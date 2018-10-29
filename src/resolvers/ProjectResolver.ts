import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Customer, Folder, Project, User } from 'app/entity';
import { PaginationArgs } from 'app/resolvers/args';
import { ProjectInput } from 'app/resolvers/inputs';

@Resolver((of) => Project)
export class ProjectResolver {
  @InjectRepository(Project)
  private readonly projectRepository: Repository<Project>;

  @InjectRepository(Customer)
  private readonly customerRepository: Repository<Customer>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Folder)
  private readonly folderRepository: Repository<Folder>;

  @Query((returns) => Project, { nullable: true })
  public project(@Arg('projectId') projectId: string): Promise<Project | undefined> {
    return this.projectRepository.findOne(projectId);
  }

  @Query((returns) => [Project])
  public projects(@Args() { skip, take }: PaginationArgs): Promise<Project[]> {
    return this.projectRepository.find({ skip, take });
  }

  @Mutation((returns) => Project)
  public addProject(@Arg('project') projectInput: ProjectInput): Promise<Project> {
    const project = this.projectRepository.create({ ...projectInput });
    return this.projectRepository.save(project);
  }

  @FieldResolver()
  public async user(@Root() project: Project): Promise<User | undefined> {
    return project.userId ? await this.userRepository.findOne(project.userId) : undefined;
  }

  @FieldResolver()
  public async customer(@Root() project: Project): Promise<Customer | undefined> {
    return project.customerId ? this.customerRepository.findOne(project.customerId) : undefined;
  }

  @FieldResolver()
  public async folder(@Root() project: Project): Promise<Folder> {
    return (await this.folderRepository.findOne(project.folderId))!;
  }
}
