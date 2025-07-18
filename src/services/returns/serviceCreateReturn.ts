import { v4 as uuidv4 } from 'uuid'
import Return from '@models/returns'
import { returnValidation } from '../../schemas/ventas/returnsSchema'
import { returnsAttributes } from '@type/ventas/returns'
import saleDetail from '@models/saleDetail'
import sale from '@models/sale'
import WarehouseStore from '@models/warehouseStore'

const serviceCreateReturn = async (body: returnsAttributes) => {
  const validation = returnValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  // Genera un UUID si no se envió uno
  const {
    id = uuidv4(),
    productId,
    salesId,
    reason,
    observations,
  } = validation.data

  // Buscar la venta para obtener el storeId
  const saleRecord = await sale.findByPk(salesId)
  if (!saleRecord) {
    return { error: 'Venta no encontrada para asociar devolución' }
  }
  const storeId = saleRecord.store_id

  // Buscar el detalle de venta para obtener la cantidad
  const detail = await saleDetail.findOne({
    where: { saleId: salesId, productId },
  })
  if (!detail) {
    return {
      error: 'Detalle de venta no encontrado para este producto y venta',
    }
  }
  const quantityToReturn = detail.quantity

  // Buscar el registro en warehouseStore
  const warehouseStore = await WarehouseStore.findOne({
    where: { storeId, productId },
  })
  if (!warehouseStore) {
    return { error: 'No existe stock en almacén para restar la devolución' }
  }

  // Restar la cantidad
  warehouseStore.quantity = warehouseStore.quantity - quantityToReturn
  await warehouseStore.save()

  // Registrar la devolución
  const newReturn = await Return.create({
    id, // Asegura que siempre haya un id
    productId,
    salesId,
    reason: reason ?? '',
    observations: observations ?? undefined,
  }).catch((error) => {
    return {
      error: 'Error al registrar la devolución',
      details: error.message,
    }
  })

  return newReturn
}

export default serviceCreateReturn
