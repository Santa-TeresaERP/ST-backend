import Return from '@models/returns'
import { returnValidation } from '../../schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'
import Product from '@models/product'

type ServiceResult =
  | { success: true; data: Return }
  | { error: string; details?: string | unknown }

const serviceUpdateReturn = async (
  id: string,
  body: Partial<returnsAttributes>,
): Promise<ServiceResult> => {
  const validation = returnValidation({ ...body, id } as returnsAttributes)

  if (!validation.success) {
    return { error: 'Validación fallida', details: validation.error.errors }
  }

  const existing = await Return.findByPk(id)
  if (!existing) return { error: 'Devolución no encontrada' }

  const { productId, salesId, reason, observations, quantity } = validation.data

  let finalPrice = existing.price

  // Si se actualiza el producto o la cantidad, recalcula el precio total
  if (
    (productId && productId !== existing.productId) ||
    quantity !== undefined
  ) {
    const product = await Product.findByPk(productId || existing.productId)
    if (!product) return { error: 'Producto no encontrado' }

    const unitPrice = product.price
    const usedQuantity = quantity ?? existing.quantity

    finalPrice = unitPrice * usedQuantity
  }

  try {
    await existing.update({
      productId,
      salesId,
      reason: reason ?? undefined,
      observations: observations ?? undefined,
      quantity,
      price: finalPrice,
    })

    return { success: true, data: existing }
  } catch (error: unknown) {
    return {
      error: 'Error al actualizar la devolución',
      details: error instanceof Error ? error.message : error,
    }
  }
}

export default serviceUpdateReturn
