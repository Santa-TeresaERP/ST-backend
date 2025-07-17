import WarehouseStore from '@models/warehouseStore'
import Store from '@models/store'
import Product from '@models/product'

const serviceGetWarehouseStores = async () => {
  // Obtener todos los registros del almacén incluyendo las relaciones con Store y Product
  const warehouseStores = await WarehouseStore.findAll({
    include: [
      { model: Store, as: 'store' },
      { model: Product, as: 'product' },
    ],
  })
  return warehouseStores
}

export default serviceGetWarehouseStores
