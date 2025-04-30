import WarehouseStore from '@models/warehouseStore'

const serviceDeleteWarehouseStore = async (id: string) => {
  const warehouseStore = await WarehouseStore.findByPk(id)
  if (!warehouseStore) {
    return null
  }

  await warehouseStore.destroy()
  return { message: 'Almacen eliminado correctamente' }
}

export default serviceDeleteWarehouseStore
