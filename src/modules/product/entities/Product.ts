import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Category from '../../category/entities/Category';

@ObjectType()
@Entity('products')
class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.products, { lazy: true })
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Promise<Category[]>;

  @Field(() => String)
  @Column()
  slug: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  more_info?: string;

  @Field(() => Number)
  @Column()
  price: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  promotional_price?: number;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
