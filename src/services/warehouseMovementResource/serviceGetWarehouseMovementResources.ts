import WarehouseMovementResource from '@models/warehouseMovomentResource'

const serviceGetWarehouseMovementResources = async () => {
  const records = await WarehouseMovementResource.findAll()
  return records
}

export default serviceGetWarehouseMovementResources
