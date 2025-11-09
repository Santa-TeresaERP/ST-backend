import ProductPurchased from '@models/productPurchased'
import { productPurchasedValidation } from '../../schemas/almacen/productPurchasedSchema'
import { CreateProductPurchasedPayload } from '../../types/almacen/product_purchased'

export const serviceCreateProductPurchased = async (
  body: CreateProductPurchasedPayload,
) => {
  const validation = productPurchasedValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const newProduct = await ProductPurchased.create(validation.data)
  return { data: newProduct }
}
