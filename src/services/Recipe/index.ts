import serviceCreateRecipe from './servicesCreateRecipe'
import serviceUpdateRecipe from './servicesUpdateRecipes'
import serviceGetRecipes from './servicesGetRecipes'
import serviceDeleteRecipe from './servicesDeleteRecipes'
import serviceGetRecipesByProd from './serviceGetRecipesByProd'

const useRecipe = {
  serviceCreateRecipe,
  serviceUpdateRecipe,
  serviceGetRecipes,
  serviceGetRecipesByProd,
  serviceDeleteRecipe,
}

export default useRecipe
