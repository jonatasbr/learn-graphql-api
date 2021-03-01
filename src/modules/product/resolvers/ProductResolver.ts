import { GraphQLUpload } from 'apollo-server';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { createWriteStream } from 'fs';

import Category from '../../category/entities/Category';
import { CategoryBySlug } from '../../category/inputs/CategoryBySlug';
import Product from '../entities/Product';
import { CreateProductInput } from '../inputs/CreateProductInput';
import UploadInput from '../inputs/UploadInput';

@Resolver()
class ProductResolver {
  @Query(() => [Product])
  products() {
    return Product.find();
  }

  @Query(() => Product)
  product(@Arg('id') id: string) {
    return Product.findOne({ where: { id } });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('data')
    data: CreateProductInput,

    @Arg('categories', () => [CategoryBySlug])
    categories: Category[]
  ) {
    const listCategories: Category[] = await Category.find({
      where: (await Promise.resolve(categories)).map((category) => {
        return { slug: `${category.slug}` };
      }),
    });

    const product = Product.create(data);

    if (!listCategories || listCategories.length === 0)
      throw new Error('Categories not found!');

    product.categories = Promise.resolve(listCategories);

    await product.save();

    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('id') id: string,
    @Arg('data') data: CreateProductInput
  ) {
    const product = await Product.findOne({ where: { id } });

    if (!product) throw new Error('Product not found!');

    Object.assign(product, data);

    await product.save();

    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg('id') id: string) {
    const product = await Product.findOne({ where: { id } });

    if (!product) throw new Error('Product not found!');

    await product.remove();

    return true;
  }

  @Mutation(() => Boolean)
  async uploadTest(
    @Arg('file', () => GraphQLUpload)
    file: UploadInput
  ): Promise<boolean> {
    return new Promise((resolve, reject) =>
      file
        .createReadStream()
        .pipe(
          createWriteStream(__dirname + `/../../../images/${file.filename}`)
        )
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}
export default ProductResolver;
