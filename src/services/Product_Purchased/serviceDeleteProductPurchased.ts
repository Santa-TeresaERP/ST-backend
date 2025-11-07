import ProductPurchased from '@models/productPurchased'

/**
 * Realiza un "soft delete" actualizando el status del producto a false.
 */
export const serviceDeleteProductPurchased = async (id: string) => {
  const product = await ProductPurchased.findByPk(id)
  if (!product) {
    return { error: 'Producto no encontrado.' }
  }

  await product.update({ status: false })
  return { data: { message: 'Producto eliminado exitosamente.' } }
}
