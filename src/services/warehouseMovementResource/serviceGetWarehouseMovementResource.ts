import WarehouseMovementResource from '@models/warehouseMovomentResource'

const serviceGetWarehouseMovementResource = async (id: string) => {
  const record = await WarehouseMovementResource.findByPk(id)
  if (!record) {
    return { error: 'Recurso de movimiento de almacén no encontrado' }
  }
  return record
}

export default serviceGetWarehouseMovementResource
