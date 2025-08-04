import { v4 as uuidv4 } from 'uuid'
import Return from '@models/returns'
import Product from '@models/product'
import Sale from '@models/sale'
import { returnValidation } from '../../schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'
import useWarehouseStore from '@services/warehouseStore'

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

  // 📦 Buscar la venta para obtener el storeId
  const sale = await Sale.findByPk(salesId)
  if (!sale) {
    throw new Error('Venta no encontrada')
  }

  const storeId = sale.store_id

  // 🔍 Buscar el inventario
  const warehouseStore =
    await useWarehouseStore.serviceGetWarehouseStoreByStoreAndProduct({
      storeId,
      productId,
    })

  if (!warehouseStore) {
    throw new Error('Producto no encontrado en el inventario de esta tienda')
  }

  // ↕️ Lógica condicional según la razón
  let updatedQuantity = warehouseStore.quantity

  if (reason === 'transporte' || reason === 'caducado') {
    updatedQuantity -= quantity
  } else if (reason === 'devuelto') {
    updatedQuantity += quantity
  }

  // 💾 Actualizar el inventario
  await useWarehouseStore.serviceUpdateWarehouseStore(warehouseStore.id, {
    quantity: updatedQuantity,
  })

  // 📝 Crear la devolución
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
