import { Collection } from 'app/entity';
import { IsString } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CollectionInput implements Partial<Collection> {
  @Field()
  @IsString()
  public name: string;

  @Field((type) => ID, { nullable: true })
  public folderId?: string;

  @Field((type) => ID, { nullable: true })
  public userId?: string;

  @Field((type) => ID, { nullable: true })
  public groupId?: string;
}
