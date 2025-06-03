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
    // Buscar el WarehouseProduct antes de crear el movimiento
    const warehouseProduct = await WarehouseProduct.findOne({
      where: { warehouse_id, product_id },
    })

    if (!warehouseProduct) {
      return { success: false, error: 'WarehouseProduct not found' }
    }

    // Validar stock suficiente antes de crear el movimiento
    if (movement_type === 'salida' && warehouseProduct.quantity < quantity) {
      return { success: false, error: 'Insufficient quantity in stock' }
    }

    // Actualizar cantidad
    if (movement_type === 'entrada') {
      warehouseProduct.quantity += quantity
    } else if (movement_type === 'salida') {
      warehouseProduct.quantity -= quantity
    }

    // Guardar el WarehouseProduct actualizado
    await warehouseProduct.save()

    // Ahora sí, crear el movimiento
    const newMovement = await WarehouseMovementProduct.create({
      warehouse_id,
      store_id,
      product_id,
      movement_type,
      quantity,
      movement_date,
      observations,
    })

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
