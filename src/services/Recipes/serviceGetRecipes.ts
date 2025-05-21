import RecipeProductResource from '@models/recipe_product_resource'

const serviceGetRecipes = async (): Promise<RecipeProductResource[]> => {
  const recipes = await RecipeProductResource.findAll()

  return recipes
}

export default serviceGetRecipes
