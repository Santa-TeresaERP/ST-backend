import { serviceCreateProductPurchased } from './serviceCreateProductPurchased'
import { serviceDeleteProductPurchased } from './serviceDeleteProductPurchased'
import { serviceGetAllProductPurchased } from './serviceGetAllProductPurchased'
import { serviceGetProductPurchased } from './serviceGetProductPurchased'
import { serviceGetProductPurchasedById } from './serviceGetProductPurchasedById'
import { serviceUpdateProductPurchased } from './serviceUpdateProductPurchased'

// Agrupamos todos los servicios en un solo objeto para exportar
const productPurchasedService = {
  create: serviceCreateProductPurchased,
  delete: serviceDeleteProductPurchased,
  getAll: serviceGetAllProductPurchased, // Para developer
  get: serviceGetProductPurchased, // Para UI
  getById: serviceGetProductPurchasedById,
  update: serviceUpdateProductPurchased,
}

export default productPurchasedService
