import { Notification } from 'app/entity';
import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NotificationInput implements Partial<Notification> {
  @Field()
  @IsString()
  public message: string;

  @Field()
  @IsString()
  public topic: string;
}
