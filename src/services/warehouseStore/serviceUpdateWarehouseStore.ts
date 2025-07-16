import WarehouseStore from '@models/warehouseStore'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { warehouseStoreValidation } from 'src/schemas/ventas/warehouseStoreSchema'

const serviceUpdateWarehouseStore = async (
  id: string,
  body: warehouseStoreAttributes,
) => {
  // Validar los datos del cuerpo usando el esquema de validación
  const validation = warehouseStoreValidation(body)

  if (!validation.success) {
    // Retornar errores de validación si los datos no son válidos
    return { error: validation.error.errors }
  }

  const { quantity } = validation.data

  // Buscar el registro por su ID
  const warehouseStore = await WarehouseStore.findByPk(id)
  if (!warehouseStore) {
    // Retornar un error si el registro no existe
    return { error: 'El registro no existe en el almacén' }
  }

  // Actualizar el registro con los nuevos datos
  await warehouseStore.update({ quantity })
  return warehouseStore
}

export default serviceUpdateWarehouseStore
