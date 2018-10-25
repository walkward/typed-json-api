import { User } from 'app/entity';
import { IsAlpha, IsEmail, Length, Matches } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  public firstname: string;

  @Field()
  @IsAlpha()
  public lastname: string;

  @Field()
  @IsEmail()
  public email: string;

  @Field()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'gm', {
    message: 'Passwords must contain at least 1 uppercase letter, 1 lowercase letter, ' +
      '1 number and must have at least 8 characters.',
  })
  public password: string;

  @Field()
  @Length(6, 100)
  public login: string;

  @Field((type) => ID)
  public customerId: string;
}
