import WarehouseMovementProduct from '@models/warehouseMovementProduct'
import WarehouseProduct from '@models/warehouseProduct'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'
import { warehouseMovementProductValidation } from 'src/schemas/almacen/warehouseMovementProductScheama'
import { Transaction } from 'sequelize'
import WarehouseStore from '@models/warehouseStore'

const serviceCreatewarehouseMovementProduct = async (
  data: WarehouseMovomentProductAttributes,
  transaction?: Transaction,
) => {
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
    let warehouseProduct = await WarehouseProduct.findOne({
      where: { warehouse_id, product_id },
      transaction,
    })

    // [CORRECCIÓN 1] Añadimos una bandera para saber si el producto es nuevo en el almacén
    const isNewProduct = !warehouseProduct;

    if (isNewProduct) {
      console.log(
        `📦 WarehouseProduct no encontrado, creando nuevo registro`,
      )
      warehouseProduct = await WarehouseProduct.create(
        {
          warehouse_id,
          product_id,
          quantity: 0, // Se crea con 0, pero lo ajustaremos después
          entry_date: new Date(),
        },
        { transaction },
      )
      console.log('✅ WarehouseProduct creado exitosamente')
    }

<<<<<<< Updated upstream
    // Validar stock suficiente antes de crear el movimiento (solo para salidas)
    if (movement_type === 'salida' && warehouseProduct.quantity < quantity) {
=======
    const warehouse = await Warehouse.findByPk(warehouse_id)
    if (!warehouse) {
      return { success: false, error: 'Almacén no encontrado' }
    }

    const warehouseStatusValidation = validateWarehouseStatus({ status: warehouse.status })
    if (!warehouseStatusValidation.success) {
      return warehouseStatusValidation
    }

    // [CORRECCIÓN 2] La validación de stock ahora NO se aplica si el producto es nuevo.
    // Un producto nuevo no puede tener "stock insuficiente" para su primer movimiento de salida.
    if (!isNewProduct && movement_type === 'salida' && warehouseProduct!.quantity < quantity) {
>>>>>>> Stashed changes
      return {
        success: false,
        error: `Stock insuficiente. Disponible: ${warehouseProduct!.quantity}, Solicitado: ${quantity}`,
      }
    }

    if (movement_type === 'entrada') {
      console.log(
        `📈 Sumando ${quantity} al stock actual: ${warehouseProduct!.quantity}`,
      )
      warehouseProduct!.quantity += quantity
    } else if (movement_type === 'salida') {
      console.log(
        `📉 Restando ${quantity} del stock actual: ${warehouseProduct!.quantity}`,
      )
      warehouseProduct!.quantity -= quantity
    }

    await warehouseProduct!.save({ transaction })
    console.log(`✅ Stock actualizado a: ${warehouseProduct!.quantity}`)

    const newMovement = await WarehouseMovementProduct.create(
      {
        warehouse_id,
        store_id: store_id || null,
        product_id,
        movement_type,
        quantity,
        movement_date,
        observations,
      },
      { transaction },
    )
    console.log('✅ Movimiento de almacén creado exitosamente')

    if (store_id) {
      let warehouseStore = await WarehouseStore.findOne({
        where: { storeId: store_id, productId: product_id },
        transaction,
      })

      if (!warehouseStore) {
        warehouseStore = await WarehouseStore.create(
          {
            storeId: store_id,
            productId: product_id,
            quantity: 0,
          },
          { transaction },
        )
      }

      // [MODIFICACIÓN] La lógica para actualizar la tienda debe ser consistente.
      // Si es una 'salida' del almacén, es una 'entrada' para la tienda.
      // Asumiremos que cualquier movimiento hacia una tienda incrementa su stock.
      warehouseStore.quantity += quantity
      
      await warehouseStore.save({ transaction })
      console.log('✅ Inventario de tienda actualizado')
    }

    return { success: true, movement: newMovement, warehouseProduct }
  } catch (error) {
    console.error('❌ Error en serviceCreatewarehouseMovementProduct:', error)
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