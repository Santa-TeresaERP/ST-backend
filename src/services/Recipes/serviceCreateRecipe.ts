import RecipeProductResource from '@models/recipe_product_resourse'
import { v4 as uuid } from 'uuid'

interface RecipeData {
  product_id: string
  quantity_required: string
  unit: string
}

const serviceCreateRecipe = async (
  recipeData: RecipeData,
): Promise<RecipeProductResource> => {
  try {
    const recipeProduct = await RecipeProductResource.create({
      id: uuid(),
      product_id: recipeData.product_id,
      quantity_required: recipeData.quantity_required,
      unit: recipeData.unit,
    })

    return recipeProduct
  } catch (error) {
    console.error('Error al crear la receta:', error)
    throw new Error('No se pudo crear la receta')
  }
}

export default serviceCreateRecipe
