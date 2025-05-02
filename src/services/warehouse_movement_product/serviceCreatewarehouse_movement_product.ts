import WarehouseMovementProduct from '@models/warehouseMovementProduct'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'
import { warehouseMovementProductValidation } from 'src/schemas/almacen/warehouseMovementProductScheama'

const serviceCreatewarehouseMovementProduct = async (
  data: WarehouseMovomentProductAttributes,
) => {
  // Validar los datos antes de proceder
  const validation = warehouseMovementProductValidation(data)
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

  try {
    // Crear un nuevo registro en la base de datos
    const newMovement = await WarehouseMovementProduct.create({
      warehouse_id,
      store_id,
      product_id,
      movement_type,
      quantity,
      movement_date,
      observations,
    })

    return { success: true, movement: newMovement }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al crear el movimiento de producto en el almacén',
    }
  }
}

export default serviceCreatewarehouseMovementProduct
