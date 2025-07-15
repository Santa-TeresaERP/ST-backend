import WarehouseMovementResource from '@models/warehouseMovomentResource'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { warehouseMovementResourceValidation } from 'src/schemas/almacen/warehouseMovomentResourceSchema'
import BuysResource from '@models/buysResource'

const serviceCreateWarehouseMovementResource = async (
  body: WarehouseMovomentResourceAttributes,
) => {
  const validation = warehouseMovementResourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const {
    warehouse_id,
    resource_id,
    movement_type,
    quantity,
    movement_date,
    observations,
  } = validation.data

  // Verificamos existencia del recurso en el almacén
  const warehouseResource = await BuysResource.findOne({
    where: { warehouse_id, resource_id },
  })

  // Lógica de validación según el tipo de movimiento
  if (movement_type === 'salida') {
    if (!warehouseResource) {
      console.warn('[SALIDA] ❌ Recurso no encontrado en el almacén.')
      return {
        error:
          'El recurso no existe en el almacén. No se puede registrar una salida.',
      }
    }
    if (warehouseResource.quantity < quantity) {
      console.warn(
        `[SALIDA] ❌ Stock insuficiente: solicitado ${quantity}, disponible ${warehouseResource.quantity}`,
      )
      return {
        error: `Stock insuficiente. Solo hay ${warehouseResource.quantity} unidades disponibles.`,
      }
    }

    console.log(
      `[SALIDA] ✅ Movimiento válido. Stock actual: ${warehouseResource.quantity}`,
    )
  }

  if (movement_type === 'entrada') {
    if (!warehouseResource) {
      console.warn(
        '[ENTRADA] ❌ Recurso no registrado previamente. Requiere proveedor.',
      )
      return {
        error:
          'El recurso aún no ha sido registrado en el almacén. No se puede ingresar sin proveedor.',
      }
    }

    console.log(
      `[ENTRADA] ✅ Recurso encontrado. Permitido registrar entrada sin proveedor.`,
    )
  }

  // Si pasó las validaciones, registrar el movimiento
  const newRecord = await WarehouseMovementResource.create({
    warehouse_id,
    resource_id,
    movement_type,
    quantity,
    movement_date,
    observations: observations ?? null,
  })

  return { newRecord }
}

export default serviceCreateWarehouseMovementResource
