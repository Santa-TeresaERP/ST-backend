import serviceCreateRecipe from './serviceCreateRecipe'
import serviceGetRecipes from './serviceGetRecipes'
import serviceGetRecipesByID from './serviceGetRecipesByID'
import serviceUpdateRecipes from './serviceUpdateRecipes'
import serviceDeleteRecipes from './serviceDeleteRecipes'
import serviceConversion from './serviceConversion'

const useRecipes = {
  createRecipe: serviceCreateRecipe,
  getRecipes: serviceGetRecipes,
  getRecipesByID: serviceGetRecipesByID,
  updateRecipes: serviceUpdateRecipes,
  deleteRecipes: serviceDeleteRecipes,
  conversion: serviceConversion,
}

export default useRecipes
