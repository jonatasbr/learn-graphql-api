import { MaxLength } from 'class-validator';
import { InputType, Field, Float } from 'type-graphql';

@InputType()
export class CreateProductInput {
  @Field()
  @MaxLength(255)
  title: string;

  @Field()
  @MaxLength(255)
  slug: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  more_info?: string;

  @Field()
  price: number;

  @Field(() => Float, { nullable: true })
  promotional_price?: number;
}
