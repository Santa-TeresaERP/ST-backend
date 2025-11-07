import ProductPurchased from '@models/productPurchased'

/**
 * Busca un producto comprado específico por su ID.
 * Por seguridad, también verifica que el status sea true.
 */
export const serviceGetProductPurchasedById = async (id: string) => {
  const product = await ProductPurchased.findOne({
    where: { id, status: true },
  })

  if (!product) {
    return { error: 'Producto no encontrado.' }
  }
  return { data: product }
}
