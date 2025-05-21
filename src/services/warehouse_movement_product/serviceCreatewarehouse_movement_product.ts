import WarehouseMovementProduct from '@models/warehouseMovementProduct'
import WarehouseProduct from '@models/warehouseProduct'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'
import { warehouseMovementProductValidation } from 'src/schemas/almacen/warehouseMovementProductScheama'

const serviceCreatewarehouseMovementProduct = async (
  data: WarehouseMovomentProductAttributes,
) => {
  // Validar los datos antes de proceder
  const validation = warehouseMovementProductValidation(data)
  if (!validation.success) {
    return { success: false, error: validation.error.issues }
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

    // Find the WarehouseProduct
    const warehouseProduct = await WarehouseProduct.findOne({
      where: { warehouse_id, product_id },
    })

    // If WarehouseProduct is not found, return an error
    if (!warehouseProduct) {
      return { success: false, error: 'WarehouseProduct not found' }
    }

    // Update quantity based on movement_type
    if (movement_type === 'entrada') {
      warehouseProduct.quantity += quantity
    } else if (movement_type === 'salida') {
      if (warehouseProduct.quantity < quantity) {
        return { success: false, error: 'Insufficient quantity in stock' }
      }
      warehouseProduct.quantity -= quantity
    }

    // Save the updated WarehouseProduct
    await warehouseProduct.save()

    return { success: true, movement: newMovement, warehouseProduct }
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
