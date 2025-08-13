import WarehouseMovementResource from '@models/warehouseMovomentResource'

const serviceDeleteWarehouseMovementResource = async (id: string) => {
  const record = await WarehouseMovementResource.findByPk(id)
  if (!record) {
    return { error: 'Recurso de movimiento de almacén no encontrado' }
  }

  // Alternar estado
  record.status = !record.status
  await record.save()
  console.log(
    `Estado del recurso de movimiento de almacén con ID ${id} cambiado a ${record.status ? 'activo' : 'inactivo'}`,
  )

  return { message: 'Recurso eliminado correctamente' }
}

export default serviceDeleteWarehouseMovementResource
