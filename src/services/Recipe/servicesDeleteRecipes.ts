import Recipe from '@models/recipe'

const serviceDeleteRecipe = async (id: string) => {
  const recipe = await Recipe.findByPk(id)

  if (!recipe) {
    return { error: 'La receta no existe' }
  }

  await recipe.destroy()
  return { message: 'Receta eliminada correctamente' }
}

export default serviceDeleteRecipe
