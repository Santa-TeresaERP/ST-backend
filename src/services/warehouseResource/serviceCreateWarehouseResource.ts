import WarehouseResource from '@models/warehouseResource'
import { warehouseResourceValidation } from 'src/schemas/almacen/warehouseResourceSchema'
import { WarehouseResourceAttributes } from '@type/almacen/warehouse_resource'

const serviceCreateWarehouseResource = async (
  body: WarehouseResourceAttributes,
) => {
  const validation = warehouseResourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { warehouse_id, resource_id, quantity, entry_date } = validation.data

  try {
    const newWarehouseResource = await WarehouseResource.create({
      warehouse_id,
      resource_id,
      quantity,
      entry_date,
    })

    return newWarehouseResource
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al crear el recurso de almacén',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al crear el recurso de almacén' }
  }
}

export default serviceCreateWarehouseResource
