import RecipeProductResource from '@models/recipe_product_resource'
import Resource from '@models/resource'

const serviceGetRecipeProductResources = async () => {
  return await RecipeProductResource.findAll({
    include: [{ model: Resource, as: 'resource' }],
  })
}

export default serviceGetRecipeProductResources
