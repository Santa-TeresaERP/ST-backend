import warehouse from '@models/warehouse'
import { WarehouseAttributes } from 'src/types/almacen/warehouse'
import { warehouseValidation } from 'src/schemas/almacen/warehouseSchema'

const serviceUpdatewarehouse = async (
  id: string,
  body: WarehouseAttributes,
) => {
  // Validar los datos antes de proceder
  const validation = warehouseValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, location, capacity, observation } = validation.data

  // Buscar el almacén por ID
  const warehouses = await warehouse.findByPk(id)
  if (!warehouses) {
    return { error: 'No se encontró un almacén con el ID proporcionado' }
  }

  try {
    // Actualizar el almacén
    await warehouses.update({
      name,
      location,
      capacity,
      observation,
    })

    return { success: true, warehouse: warehouses }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al actualizar el almacén',
    }
  }
}

export default serviceUpdatewarehouse
