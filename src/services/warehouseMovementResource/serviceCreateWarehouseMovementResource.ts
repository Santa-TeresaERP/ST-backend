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
    type,
    movement_type,
    quantity,
    movement_date,
    observations,
  } = validation.data

  const newRecord = await WarehouseMovementResource.create({
    id,
    warehouse_id,
    resource_id,
    type,
    movement_type,
    quantity,
    movement_date,
    observations: observations ?? null,
  })

  return newRecord
}

export default serviceCreateWarehouseMovementResource
