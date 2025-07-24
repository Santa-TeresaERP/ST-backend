import { v4 as uuidv4 } from 'uuid'
import Return from '@models/returns'
import Product from '@models/product'
import { returnValidation } from '../../schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'
import saleDetail from '@models/saleDetail'
import sale from '@models/sale'
import WarehouseStore from '@models/warehouseStore'

const serviceCreateReturn = async (
  body: returnsAttributes,
): Promise<Return> => {
  const validation = returnValidation(body)

  if (!validation.success) {
    console.error(validation.error.format())
    throw new Error('Validación fallida')
  }

  const {
    id = uuidv4(),
    productId,
    salesId,
    reason,
    observations,
    quantity,
  } = validation.data

  if (!productId) {
    throw new Error('El ID del producto es obligatorio')
  }

  const product = await Product.findByPk(productId)
  if (!product) {
    throw new Error('Producto no encontrado')
  }

  const unitPrice = product.price
  const price = unitPrice * quantity

  try {
    const newReturn = await Return.create({
      id,
      productId: productId ?? null,
      salesId: salesId ?? null,
      reason: reason ?? '',
      observations: observations ?? undefined,
      quantity,
      price,
    })

    return newReturn
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Error desconocido al registrar devolución',
    )
  }
}

export default serviceCreateReturn
