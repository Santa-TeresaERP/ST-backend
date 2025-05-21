import createRecipeController from './createRecipe'
import getRecipesController from './getRecipes'
import getRecipesByIDController from './getRecipesByID'
import updateRecipesController from './updateRecipes'
import deleteRecipeController from './deleteRecipe'
import conversion from './conversion'

const recipesController = {
  createRecipe: createRecipeController,
  getRecipes: getRecipesController,
  getRecipesByID: getRecipesByIDController,
  updateRecipes: updateRecipesController,
  deleteRecipe: deleteRecipeController,
  conversion: conversion,
}

export default recipesController
