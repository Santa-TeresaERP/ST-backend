import WarehouseResource from '@models/warehouseResource'
import { warehouseResourceValidation } from 'src/schemas/almacen/warehouseResourceSchema'
import { WarehouseResourceAttributes } from '@type/almacen/warehouse_resource'

const serviceCreateWarehouseResource = async (
  body: WarehouseResourceAttributes,
) => {
  const validation = warehouseResourceValidation(body)

  if (!validation.success) {
    // Devuelve el error detallado de validación
    return {
      error: 'Error de validación',
      details: validation.error.errors,
      body, // Incluye el body recibido para depuración
    }
  }

  const { warehouse_id, resource_id, quantity, entry_date } = validation.data

  try {
    const newWarehouseResource = await WarehouseResource.create({
      warehouse_id,
      resource_id,
      quantity,
      entry_date,
    })

    return { resource: newWarehouseResource }
  } catch (error: unknown) {
    // Devuelve el error real de la base de datos con detalles
    if (error instanceof Error) {
      return {
        error: 'Error al crear el recurso de almacén',
        details: error.message,
        stack: error.stack,
        body, // Incluye el body recibido para depuración
      }
    }
    return {
      error: 'Error desconocido al crear el recurso de almacén',
      body,
    }
  }
}

export default serviceCreateWarehouseResource
