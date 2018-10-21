import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Group } from 'app/entity/Group';

@Resolver(Group)
export class GroupResolver {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
  ) {}

  @Query((returns) => Group, { nullable: true })
  public group(@Arg('groupId', (type) => Int) groupId: number) {
    return this.groupRepository.findOne(groupId);
  }

  @Query((returns) => [Group])
  public groups(): Promise<Group[]> {
    return this.groupRepository.find();
  }
}
