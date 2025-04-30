import warehouseStore from '@models/warehouseStore'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { warehouseStoreValidation } from 'src/schemas/ventas/warehouseStoreSchema'

const serviceUpdateWarehouseStore = async (
  id: string,
  body: Partial<warehouseStoreAttributes>,
) => {
  const validation = warehouseStoreValidation({
    quantity: 0, // Provide a default value for 'quantity'
    ...body,
  })
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const warehouseStoreToUpdate = await warehouseStore.findByPk(id)
  if (!warehouseStoreToUpdate) {
    return null
  }

  // Elimina el campo password del objeto body si existe
  const { ...updateData } = body

  await warehouseStoreToUpdate.update(updateData)
  // Recarga el usuario para obtener los datos actualizados
  const updatedWarehouseStore = await warehouseStore.findByPk(id)
  return updatedWarehouseStore
}

export default serviceUpdateWarehouseStore
