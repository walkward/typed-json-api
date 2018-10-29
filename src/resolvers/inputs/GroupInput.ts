import { Group } from 'app/entity';
import { IsString } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class GroupInput implements Partial<Group> {
  @Field()
  @IsString()
  public name: string;

  @Field((type) => ID)
  public customerId: string;
}
