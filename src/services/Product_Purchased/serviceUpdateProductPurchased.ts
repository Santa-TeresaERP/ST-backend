import ProductPurchased from '@models/productPurchased'
import { productPurchasedUpdateValidation } from '../../schemas/almacen/productPurchasedSchema'
import { ProductPurchasedAttributes } from '@type/almacen/product_Purchased'

export const serviceUpdateProductPurchased = async (
  id: string,
  body: ProductPurchasedAttributes,
) => {
  const validation = productPurchasedUpdateValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const product = await ProductPurchased.findByPk(id)
  if (!product) {
    return { error: 'Producto no encontrado.' }
  }

  // No actualizamos el status aquí, solo los datos del producto
  await product.update(validation.data)
  return { data: product }
}
