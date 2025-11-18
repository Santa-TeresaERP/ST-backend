import createProductPurchasedController from './createProductPurchasedController'
import deleteProductPurchasedController from './deleteProductPurchasedController'
import getAllProductPurchasedController from './getAllProductPurchasedController'
import getProductPurchasedController from './getProductPurchasedController'
import getProductPurchasedByIdController from './getProductPurchasedByIdController'
import updateProductPurchasedController from './updateProductPurchasedController'

// Agrupamos todas las funciones de controlador en un solo objeto
const productPurchasedController = {
  create: createProductPurchasedController,
  delete: deleteProductPurchasedController,
  getAll: getAllProductPurchasedController,
  get: getProductPurchasedController,
  getById: getProductPurchasedByIdController,
  update: updateProductPurchasedController,
}

export default productPurchasedController
