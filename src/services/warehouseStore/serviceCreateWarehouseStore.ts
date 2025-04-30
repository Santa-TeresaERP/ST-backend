import WarehouseStore from '@models/warehouseStore'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { warehouseStoreValidation } from 'src/schemas/ventas/warehouseStoreSchema'

const serviceCreateWarehouseStore = async (body: warehouseStoreAttributes) => {
  const validation = warehouseStoreValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { storeId, productId, quantity } = body
  let warehouseStore = await WarehouseStore.findOne({
    where: {
      storeId: storeId,
    },
  })

  if (warehouseStore) {
    return null
  }

  warehouseStore = await WarehouseStore.create({
    storeId,
    productId,
    quantity,
  })

  return warehouseStore
}

export default serviceCreateWarehouseStore
