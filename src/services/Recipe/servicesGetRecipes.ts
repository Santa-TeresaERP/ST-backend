import Recipe from '@models/recipe'

const serviceGetRecipes = async () => {
  const recipes = await Recipe.findAll()
  return recipes
}

export default serviceGetRecipes
