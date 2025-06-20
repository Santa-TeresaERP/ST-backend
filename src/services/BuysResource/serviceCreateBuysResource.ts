import BuysResource from '@models/buysResource'
import { buysResourceValidation } from 'src/schemas/almacen/BuysResourceSchema'
import { buysResourceAttributes } from '@type/almacen/buys_resource'

const serviceCreateBuysResource = async (body: buysResourceAttributes) => {
  const validation = buysResourceValidation(body)

  if (!validation.success) {
    // Devuelve el error detallado de validación
    return {
      error: 'Error de validación',
      details: validation.error.errors,
      body, // Incluye el body recibido para depuración
    }
  }

  const {
    warehouse_id,
    resource_id,
    type_unit,
    unit_price,
    total_cost,
    supplier_id,
    quantity,
    entry_date,
  } = validation.data

  try {
    const newWarehouseResource = await BuysResource.create({
      warehouse_id,
      resource_id,
      type_unit,
      unit_price,
      total_cost,
      supplier_id,
      quantity,
      entry_date,
    })

    return { resource: newWarehouseResource }
  } catch (error: unknown) {
    // Devuelve el error real de la base de datos con detalles
    if (error instanceof Error) {
      return {
        error: 'Error al crear el Dato de compra',
        details: error.message,
        stack: error.stack,
        body, // Incluye el body recibido para depuración
      }
    }
    return {
      error: 'Error desconocido al crear el Dato de compra',
      body,
    }
  }
}

export default serviceCreateBuysResource
