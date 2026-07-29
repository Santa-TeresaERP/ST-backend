import WarehouseMovementResource from '@models/warehouseMovomentResource'

const serviceGetWarehouseMovementResources = async () => {
  const records = await WarehouseMovementResource.findAll({
    order: [['movement_date', 'DESC']],
  })
  return records
}

export default serviceGetWarehouseMovementResources
