import RecipeProductConection from '@models/recipe_product_conections'

const serviceGetRecipeProductConections = async () => {
  try {
    const conections = await RecipeProductConection.findAll()
    return conections
  } catch {
    return { error: 'Error al obtener las conexiones receta-recurso' }
  }
}

export default serviceGetRecipeProductConections
