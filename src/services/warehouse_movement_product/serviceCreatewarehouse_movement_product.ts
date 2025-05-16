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
    id,
    warehouse_id,
    store_id,
    product_id,
    movement_type,
    quantity,
    movement_date,
    observations,
    createdAt,
    updatedAt,
  } = validation.data

  try {
    // Crear un nuevo registro en la base de datos
    const newMovement = await WarehouseMovementProduct.create({
      id,
      warehouse_id,
      store_id,
      product_id,
      movement_type,
      quantity,
      movement_date,
      observations,
      createdAt,
      updatedAt,
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
