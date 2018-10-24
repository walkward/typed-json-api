import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NotificationInput {
  @Field()
  @IsString()
  public message: string;
}
