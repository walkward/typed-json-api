import { Project } from 'app/entity';
import { IsString } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class ProjectInput implements Partial<Project> {
  @Field()
  @IsString()
  public name: string;

  @Field((type) => ID)
  public customerId: string;
}
