import RecipeProductResource from '@models/recipe_product_resource'

const serviceDeleteRecipes = async (
  id: string,
  product_id: string,
): Promise<void> => {
  try {
    const resource = await RecipeProductResource.findOne({
      where: { id, product_id },
    })

    if (!resource) {
      throw new Error('Recurso no encontrado')
    }

    await resource.destroy()
  } catch (error) {
    console.error('Error al eliminar el recurso de la receta:', error)
    throw new Error('No se pudo eliminar el recurso de la receta')
  }
}

export default serviceDeleteRecipes
