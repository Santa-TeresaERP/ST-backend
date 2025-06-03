import RecipeProductConection from '@models/recipe_product_conections'
import RecipeProductResource from '@models/recipe_product_resource'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'
import { recipeProductResourceValidation } from 'src/schemas/production/recipe_product_resourse'

const serviceUpdateRecipeProductResource = async (
  id: string,
  body: { resource_id: string } & RecipeProductResourceAttributes,
) => {
  const { resource_id, ...RecipeProductResourceData } = body

  const validation = recipeProductResourceValidation(RecipeProductResourceData)

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors }
  }

  const { product_id, quantity_required, unit } = validation.data

  const recipeProduct = await RecipeProductResource.findByPk(id)
  if (!recipeProduct) throw new Error('RecipeProductResource no encontrado')

  await recipeProduct.update({
    product_id,
    quantity_required,
    unit,
  })

  // Manejar la relación con el recurso (igual que en create)
  const existingRelation = await RecipeProductConection.findOne({
    where: { resource_id, recipe_id: recipeProduct.id },
  })

  if (!existingRelation) {
    await RecipeProductConection.create({
      resource_id,
      recipe_id: recipeProduct.id,
    })
  }

  return recipeProduct
}

export default serviceUpdateRecipeProductResource
