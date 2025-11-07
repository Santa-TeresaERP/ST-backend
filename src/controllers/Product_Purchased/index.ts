import CreateProductPurchasedController from './createProductPurchasedController'
import DeleteProductPurchasedController from './deleteProductPurchasedController'
import GetAllProductPurchasedController from './getAllProductPurchasedController'
import GetProductPurchasedByIdController from './getProductPurchasedByIdController'
import UpdateProductPurchasedController from './updateProductPurchasedController'

// Agrupamos todos los controladores para una fácil importación en las rutas
const productPurchasedController = {
  create: CreateProductPurchasedController.create,
  delete: DeleteProductPurchasedController.delete,
  get: GetAllProductPurchasedController.get, // Para la UI
  getAll: GetAllProductPurchasedController.getAll, // Para developers
  getById: GetProductPurchasedByIdController.getById,
  update: UpdateProductPurchasedController.update,
}

export default productPurchasedController
