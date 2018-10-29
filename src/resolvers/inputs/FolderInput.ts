import { Folder } from 'app/entity';
import { IsString } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class FolderInput implements Partial<Folder> {
  @Field()
  @IsString()
  public name: string;

  @Field((type) => ID, { nullable: true })
  public parentId?: string;

  @Field((type) => ID, { nullable: true })
  public projectId?: string;
}
