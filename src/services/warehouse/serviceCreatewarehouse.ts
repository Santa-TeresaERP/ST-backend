import warehouse from '@models/warehouse'
import { WarehouseAttributes } from 'src/types/almacen/warehouse'
import { warehouseValidation } from 'src/schemas/almacen/warehouseSchema'

const serviceCreateWarehouse = async (data: WarehouseAttributes) => {
  // Validar los datos antes de proceder
  const validation = warehouseValidation(data)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, location, capacity, observation } = validation.data

  try {
    // Crear un nuevo registro en la base de datos
    const newWarehouse = await warehouse.create({
      name,
      location,
      capacity,
      observation,
    })

    return { success: true, warehouse: newWarehouse }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Error al crear el almacén',
    }
  }
}

export default serviceCreateWarehouse
