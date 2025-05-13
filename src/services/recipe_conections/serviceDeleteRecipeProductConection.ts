import RecipeProductConection from '@models/recipe_product_conections'

const serviceDeleteRecipeProductConection = async (
  recipe_id: string,
  resource_id: number,
) => {
  try {
    const deleted = await RecipeProductConection.destroy({
      where: { recipe_id, resource_id },
    })
    if (deleted === 0) return { error: 'Conexión no encontrada' }
    return { message: 'Conexión eliminada correctamente' }
  } catch {
    return { error: 'Error al eliminar la conexión receta-recurso' }
  }
}

export default serviceDeleteRecipeProductConection
