import WarehouseMovementProduct from '@models/warehouseMovementProduct'

const serviceGetwarehouseMovementProducts = async () => {
  // Obtener todos los movimientos de productos en el almacén
  const movements = await WarehouseMovementProduct.findAll()
  return movements
}

export default serviceGetwarehouseMovementProducts
