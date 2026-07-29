import WarehouseMovementProduct from '@models/warehouseMovementProduct'

const serviceGetwarehouseMovementProducts = async () => {
  const movements = await WarehouseMovementProduct.findAll({
    order: [['movement_date', 'DESC']],
  })
  return movements
}

export default serviceGetwarehouseMovementProducts
