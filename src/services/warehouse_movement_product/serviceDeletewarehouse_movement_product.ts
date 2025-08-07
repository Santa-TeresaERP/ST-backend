import WarehouseMovementProduct from '@models/warehouseMovementProduct'

const serviceDeletewarehouseMovementProduct = async (id: string) => {
  // Buscar el movimiento de producto por ID
  const movement = await WarehouseMovementProduct.findByPk(id)

  if (!movement) {
    return { error: 'El movimiento de producto no existe' }
  }

  // Alternar estado
  movement.status = !movement.status
  await movement.save()
  console.log(`Estado del movimiento de producto con ID ${id} cambiado a ${movement.status ? 'activo' : 'inactivo'}`)

  return { message: 'Estado del movimiento de producto actualizado correctamente' }
}

export default serviceDeletewarehouseMovementProduct
