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
    // type, // Removed type
    movement_type,
    quantity,
    movement_date,
    observations,
  } = validation.data

  // Find or create WarehouseResource
  let warehouseResource = await BuysResource.findOne({
    where: { warehouse_id, resource_id },
  })

  if (movement_type === 'salida') {
    if (!warehouseResource || warehouseResource.quantity < quantity) {
      return {
        error:
          'No hay suficiente cantidad en el almacén para realizar la salida o el recurso no existe en el almacén.',
      }
    }
    warehouseResource.quantity -= quantity
    await warehouseResource.save()
  } else if (movement_type === 'entrada') {
    if (warehouseResource) {
      warehouseResource.quantity += quantity
      await warehouseResource.save()
    } else {
      warehouseResource = await BuysResource.create({
        warehouse_id,
        resource_id,
        quantity,
        type_unit: 'unidad', // Assuming a default unit type
        unit_price: 0, // Assuming a default unit price
        total_cost: 0, // Assuming a default total cost
        supplier_id: '', // Assuming no supplier for this movement
        entry_date: new Date(), // Assuming entry_date should be now
      })
    }
  }

  const newRecord = await WarehouseMovementResource.create({
    warehouse_id,
    resource_id,
    // type, // Removed type
    movement_type,
    quantity,
    movement_date,
    observations: observations ?? null,
  })

  return { newRecord, warehouseResource } // Return both records
}

export default serviceCreateWarehouseMovementResource
