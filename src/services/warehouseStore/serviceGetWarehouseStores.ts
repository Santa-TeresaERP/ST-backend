import WarehouseStore from '@models/warehouseStore'

const serviceGetWarehouseStore = async () => {
  const warehouseStores = await WarehouseStore.findAll()
  return warehouseStores
}

export default serviceGetWarehouseStore
