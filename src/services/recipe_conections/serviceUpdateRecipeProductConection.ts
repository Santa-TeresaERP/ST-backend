import RecipeProductConection from '@models/recipe_product_conections'
import { RecipeProductConectionAttributes } from '@type/production/recipe_product_conections'

const serviceUpdateRecipeProductConection = async (
  recipe_id: string,
  resource_id: number,
  data: Partial<RecipeProductConectionAttributes>,
) => {
  try {
    const conection = await RecipeProductConection.findOne({
      where: { recipe_id, resource_id },
    })

    if (!conection) return { error: 'Conexión no encontrada' }

    await conection.update(data)
    return conection
  } catch {
    return { error: 'Error al actualizar la conexión' }
  }
}

export default serviceUpdateRecipeProductConection
