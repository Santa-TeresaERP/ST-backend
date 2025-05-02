import WarehouseMovementProduct from '@models/warehouseMovementProduct'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'
import { warehouseMovementProductValidation } from 'src/schemas/almacen/warehouseMovementProductScheama'

const serviceUpdatewarehouseMovementProduct = async (
  id: string,
  body: WarehouseMovomentProductAttributes,
) => {
  // Validar los datos antes de proceder
  const validation = warehouseMovementProductValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const {
    warehouse_id,
    store_id,
    product_id,
    movement_type,
    quantity,
    movement_date,
    observations,
  } = validation.data

  // Buscar el movimiento de producto por ID
  const movement = await WarehouseMovementProduct.findByPk(id)
  if (!movement) {
    return {
      error: 'No se encontró un movimiento de producto con el ID proporcionado',
    }
  }

  try {
    // Actualizar el movimiento de producto
    await movement.update({
      warehouse_id,
      store_id,
      product_id,
      movement_type,
      quantity,
      movement_date,
      observations,
    })

    return { success: true, movement }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al actualizar el movimiento de producto',
    }
  }
}

export default serviceUpdatewarehouseMovementProduct
