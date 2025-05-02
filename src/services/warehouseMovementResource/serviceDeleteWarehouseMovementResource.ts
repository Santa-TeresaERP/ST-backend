import WarehouseMovementResource from '@models/warehouseMovomentResource'

const serviceDeleteWarehouseMovementResource = async (id: string) => {
  const record = await WarehouseMovementResource.findByPk(id)
  if (!record) {
    return { error: 'Recurso de movimiento de almacén no encontrado' }
  }

  await record.destroy()
  return { message: 'Recurso eliminado correctamente' }
}

export default serviceDeleteWarehouseMovementResource
