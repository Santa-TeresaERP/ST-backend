import WarehouseMovementProduct from '@models/warehouseMovementProduct'

const serviceDeletewarehouseMovementProduct = async (id: string) => {
  // Buscar el movimiento de producto por ID
  const movement = await WarehouseMovementProduct.findByPk(id)

  if (!movement) {
    return { error: 'El movimiento de producto no existe' }
  }

  // Eliminar el movimiento de producto
  await movement.destroy()
  return { message: 'Movimiento de producto eliminado correctamente' }
}

export default serviceDeletewarehouseMovementProduct
