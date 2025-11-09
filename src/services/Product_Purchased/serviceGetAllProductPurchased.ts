import ProductPurchased from '@models/productPurchased'

/**
 * Obtiene TODOS los productos comprados, sin importar su estado.
 * Destinado para uso del desarrollador o paneles de administración especiales.
 */
export const serviceGetAllProductPurchased = async () => {
  const products = await ProductPurchased.findAll()
  return products
}
