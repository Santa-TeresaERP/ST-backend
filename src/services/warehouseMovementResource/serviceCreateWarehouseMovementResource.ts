import WarehouseMovementResource from '@models/warehouseMovomentResource'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { warehouseMovementResourceValidation } from 'src/schemas/almacen/warehouseMovomentResourceSchema'

const serviceCreateWarehouseMovementResource = async (
  body: WarehouseMovomentResourceAttributes,
) => {
  const validation = warehouseMovementResourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const {
    id,
    warehouse_id,
    resource_id,
    movement_type,
    quantity,
    movement_date,
    observations,
    createdAt,
    updatedAt,
    status,
  } = validation.data

  const newRecord = await WarehouseMovementResource.create({
    id,
    warehouse_id,
    resource_id,
    movement_type,
    quantity,
    movement_date,
    observations: observations ?? null,
    createdAt,
    updatedAt,
    status: status ?? 'active',
  })

  return newRecord
}

export default serviceCreateWarehouseMovementResource
