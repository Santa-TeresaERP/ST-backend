import WarehouseMovementResource from '@models/warehouseMovomentResource'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { warehouseMovementResourceValidation } from 'src/schemas/almacen/warehouseMovomentResourceSchema'

const serviceUpdateWarehouseMovementResource = async (
  id: string,
  body: Partial<WarehouseMovomentResourceAttributes>, // ✅ actualización parcial
) => {
  const record = await WarehouseMovementResource.findByPk(id)
  if (!record) {
    return { error: 'Recurso de movimiento de almacén no encontrado' }
  }

  // Para validar requerimos rellenar movement_id porque el schema lo exige
  const validation = warehouseMovementResourceValidation({
    ...record.toJSON(),
    ...body,
    movement_id: id, // aseguramos que tenga un ID válido para validación
  })

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const {
    warehouse_id,
    resource_id,
    type,
    movement_type,
    quantity,
    movement_date,
    observations,
  } = validation.data

  await record.update({
    warehouse_id,
    resource_id,
    type,
    movement_type,
    quantity,
    movement_date,
    observations: observations ?? undefined,
  })

  return record
}

export default serviceUpdateWarehouseMovementResource
