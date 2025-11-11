import ProductPurchased from '@models/productPurchased'
import { productPurchasedValidation } from '../../schemas/almacen/productPurchasedSchema'
import { ProductPurchasedAttributes } from '@type/almacen/product_Purchased'

export const serviceCreateProductPurchased = async (
  body: ProductPurchasedAttributes,
) => {
  const validation = productPurchasedValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const newProduct = await ProductPurchased.create(validation.data)
  return { data: newProduct }
}
