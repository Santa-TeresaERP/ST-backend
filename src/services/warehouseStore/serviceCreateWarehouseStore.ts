import WarehouseStore from '@models/warehouseStore'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { warehouseStoreValidation } from 'src/schemas/ventas/warehouseStoreSchema'

const serviceCreateWarehouseStore = async (body: warehouseStoreAttributes) => {
  // Validar los datos del cuerpo usando el esquema de validación
  const validation = warehouseStoreValidation(body)
  if (!validation.success) {
    // Retornar errores de validación si los datos no son válidos
    return { error: validation.error.errors }
  }
  // Asegurarse de que los datos validados contienen las propiedades necesarias
  const { storeId, productId, quantity } = body

  // Verificar si ya existe un registro con el mismo storeId y productId
  const existingWarehouseStore = await WarehouseStore.findOne({
    where: { storeId, productId },
  })
  if (existingWarehouseStore) {
    return { error: 'El registro ya existe en el almacén' }
  }

  // Crear un nuevo registro en el almacén
  const newWarehouseStore = await WarehouseStore.create({
    storeId,
    productId,
    quantity,
  })
  return newWarehouseStore
}

export default serviceCreateWarehouseStore
