import RecipeProductConection from '@models/recipe_product_conections'
import { RecipeProductConectionAttributes } from '@type/production/recipe_product_conections'

const serviceCreateRecipeProductConection = async (
  data: RecipeProductConectionAttributes,
) => {
  try {
    const newConection = await RecipeProductConection.create(data)
    return newConection
  } catch {
    return { error: 'Error al crear la conexión receta-recurso' }
  }
}

export default serviceCreateRecipeProductConection
