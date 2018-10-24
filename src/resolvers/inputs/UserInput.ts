import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field((type) => ID)
  public id: string;

  @Field()
  public firstname: string;
}
