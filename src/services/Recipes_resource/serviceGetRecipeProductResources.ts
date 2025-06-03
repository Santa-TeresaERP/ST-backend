import RecipeProductConection from '@models/recipe_product_conections'
import RecipeProductResource from '@models/recipe_product_resource'
import Resource from '@models/resource'

const serviceGetRecipeProductResources = async () => {
  return await RecipeProductResource.findAll({
    include: [
      {
        model: RecipeProductConection,
        as: 'recipe_product_conections',
        include: [
          {
            model: Resource,
            as: 'resource',
          },
        ],
      },
    ],
  })
}

export default serviceGetRecipeProductResources
