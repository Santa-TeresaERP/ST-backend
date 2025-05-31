import RecipeProductResource from '@models/recipe_product_resource'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'
import { v4 as uuidv4 } from 'uuid'

const serviceCreateRecipeProductResource = async (
  data: RecipeProductResourceAttributes,
) => {
  const newRecipeProductResource = await RecipeProductResource.create({
    ...data,
    id: uuidv4(),
  })
  return newRecipeProductResource
}

export default serviceCreateRecipeProductResource
