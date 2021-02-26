import { InputType, Field } from 'type-graphql';

@InputType()
export class CategoryBySlug {
  @Field()
  slug: string;
}
