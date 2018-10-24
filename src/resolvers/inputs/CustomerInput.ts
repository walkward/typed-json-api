import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerInput {
  @Field()
  @IsString()
  public name: string;
}
