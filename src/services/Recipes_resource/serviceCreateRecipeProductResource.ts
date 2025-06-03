import RecipeProductConection from '@models/recipe_product_conections'
import RecipeProductResource from '@models/recipe_product_resource'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'
import { recipeProductResourceValidation } from 'src/schemas/production/recipe_product_resourse'

const serviceCreateRecipeProductResource = async (
  body: { resource_id: string } & RecipeProductResourceAttributes,
) => {
  const { resource_id, ...RecipeProductResourceData } = body

  const validation = recipeProductResourceValidation(RecipeProductResourceData)

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors }
  }

  const { product_id, quantity_required, unit } = validation.data

  try {
    let recipeProductResource = await RecipeProductResource.findOne({
      where: { product_id },
    })

    if (!recipeProductResource) {
      recipeProductResource = await RecipeProductResource.create({
        product_id,
        quantity_required,
        unit: unit || 'g',
      })
    } else {
      await recipeProductResource.update({
        quantity_required,
        unit,
      })
    }

    const existingRelation = await RecipeProductConection.findOne({
      where: { resource_id, recipe_id: recipeProductResource.id },
    })

    if (!existingRelation) {
      await RecipeProductConection.create({
        resource_id,
        recipe_id: recipeProductResource.id,
      })
    }

    return {
      message: 'Recurso creado y asignado a la receta con éxito',
      recipeProductResource,
    }
  } catch (error) {
    console.error('Error al crear recurso y asignarlo a la receta:', error)
    return { error: 'Error al crear recurso y asignarlo a la receta' }
  }
}

export default serviceCreateRecipeProductResource
