import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import Category from '../entities/Category';
import { CreateUpdateCategoryInput } from '../inputs/CreateUpdateCategoryInput';

@Resolver()
class CategoryResolver {
  @Query(() => [Category])
  categories() {
    return Category.find();
  }

  @Query(() => Category)
  category(@Arg('id') id: string) {
    return Category.findOne({ where: { id } });
  }

  @Mutation(() => Category)
  async createCategory(@Arg('data') data: CreateUpdateCategoryInput) {
    const category = Category.create(data);

    await category.save();

    return category;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('id') id: string,
    @Arg('data') data: CreateUpdateCategoryInput
  ) {
    const category = await Category.findOne({ where: { id } });

    if (!category) throw new Error('Category not found!');

    Object.assign(category, data);

    await category.save();

    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id') id: string) {
    const category = await Category.findOne({ where: { id } });

    if (!category) throw new Error('Category not found!');

    await category.remove();

    return true;
  }
}

export default CategoryResolver;
