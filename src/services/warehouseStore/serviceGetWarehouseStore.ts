import WarehouseStore from '@models/warehouseStore'
import Store from '@models/store'
import Product from '@models/product'

const serviceGetWarehouseStore = async (id: string) => {
  // Buscar un registro específico por su ID, incluyendo las relaciones con Store y Product
  const warehouseStore = await WarehouseStore.findByPk(id, {
    include: [
      { model: Store, as: 'store' },
      { model: Product, as: 'product' },
    ],
  })

  if (!warehouseStore) {
    // Retornar un error si el registro no existe
    return { error: 'El registro no existe en el almacén' }
  }

  return warehouseStore
}

export default serviceGetWarehouseStore
