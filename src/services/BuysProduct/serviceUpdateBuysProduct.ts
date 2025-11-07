import BuysProduct from '@models/buysProduct'
import { buysProductUpdateValidation } from '../../schemas/almacen/BuysProductSchema'
import { buysProductAttributes } from '@type/almacen/buys_product'

const serviceUpdateBuysProduct = async (
  id: string,
  body: Partial<buysProductAttributes>,
) => {
  const validation = buysProductUpdateValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  try {
    const existing = await BuysProduct.findByPk(id)

    if (!existing) {
      return { error: 'Compra de producto no encontrada' }
    }

    await existing.update(validation.data)
    return existing
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al actualizar la compra de producto',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al actualizar la compra de producto' }
  }
}

export default serviceUpdateBuysProduct
