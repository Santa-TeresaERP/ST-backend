import WarehouseMovementProduct from '@models/warehouseMovementProduct'

const serviceGetwarehouseMovementProducts = async () => {
  const movements = await WarehouseMovementProduct.findAll()
  return movements
}

export default serviceGetwarehouseMovementProducts
