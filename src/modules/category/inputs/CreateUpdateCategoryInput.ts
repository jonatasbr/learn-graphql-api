import { MaxLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUpdateCategoryInput {
  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  @MaxLength(255)
  slug: string;
}
