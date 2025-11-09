import ProductPurchased from '@models/productPurchased'

/**
 * Obtiene solo los productos comprados con status: true.
 * Esta es la función que la UI debería consumir generalmente.
 */
export const serviceGetProductPurchased = async () => {
  const products = await ProductPurchased.findAll({ where: { status: true } })
  return products
}
