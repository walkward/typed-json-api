import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  @Min(0)
  public skip: number = 0;

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(50)
  public take: number = 25;
}
