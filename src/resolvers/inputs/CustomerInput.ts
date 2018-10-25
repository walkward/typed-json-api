import { Customer } from 'app/entity';
import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CustomerInput implements Partial<Customer> {
  @Field()
  @IsString()
  public name: string;
}
