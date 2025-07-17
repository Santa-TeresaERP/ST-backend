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
    let warehouseProduct = await WarehouseProduct.findOne({
      where: { warehouse_id, product_id },
      transaction,
    })

    // Si no existe el WarehouseProduct, crearlo con cantidad inicial 0
    if (!warehouseProduct) {
      console.log(
        `📦 WarehouseProduct no encontrado para warehouse ${warehouse_id} y producto ${product_id}, creando nuevo registro`,
      )
      warehouseProduct = await WarehouseProduct.create(
        {
          warehouse_id,
          product_id,
          quantity: 0,
          entry_date: new Date(),
        },
        { transaction },
      )
      console.log('✅ WarehouseProduct creado exitosamente')
    }

    // Validar si habrá stock negativo en salidas (permitir pero avisar)
    let stockNegativeWarning = null
    if (movement_type === 'salida' && warehouseProduct.quantity < quantity) {
      const stockResultante = warehouseProduct.quantity - quantity
      stockNegativeWarning = `⚠️ Stock insuficiente. Disponible: ${warehouseProduct.quantity}, Solicitado: ${quantity}. El stock resultante será: ${stockResultante} (negativo)`
      console.log(stockNegativeWarning)
    }

    // Actualizar cantidad según el tipo de movimiento
    if (movement_type === 'entrada') {
      console.log(
        `📈 Sumando ${quantity} al stock actual: ${warehouseProduct.quantity}`,
      )
      warehouseProduct.quantity += quantity
    } else if (movement_type === 'salida') {
      console.log(
        `📉 Restando ${quantity} del stock actual: ${warehouseProduct.quantity}`,
      )
      warehouseProduct.quantity -= quantity

      if (warehouseProduct.quantity < 0) {
        console.log(
          `⚠️ Stock negativo resultante: ${warehouseProduct.quantity}`,
        )
      }
    }

    // Guardar el WarehouseProduct actualizado
    await warehouseProduct.save({ transaction })
    console.log(`✅ Stock actualizado a: ${warehouseProduct.quantity}`)

    // Crear el movimiento
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

    // Si existe store_id, crear/actualizar el inventario de tienda
    let storeNegativeWarning = null
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
            createdAt: new Date(),
          },
          { transaction },
        )
      }

      // Verificar si habrá stock negativo en la tienda
      if (movement_type === 'salida' && warehouseStore.quantity < quantity) {
        const storeStockResultante = warehouseStore.quantity - quantity
        storeNegativeWarning = `⚠️ Stock de tienda insuficiente. Disponible: ${warehouseStore.quantity}, Solicitado: ${quantity}. El stock resultante será: ${storeStockResultante} (negativo)`
        console.log(storeNegativeWarning)
      }

      // Actualizar cantidad según el tipo de movimiento
      if (movement_type === 'entrada') {
        warehouseStore.quantity += quantity
      } else if (movement_type === 'salida') {
        warehouseStore.quantity -= quantity

        if (warehouseStore.quantity < 0) {
          console.log(
            `⚠️ Stock de tienda negativo resultante: ${warehouseStore.quantity}`,
          )
        }
      }
      await warehouseStore.save({ transaction })
      console.log('✅ Inventario de tienda actualizado')
    }

    // Preparar respuesta con advertencias si las hay
    const response = {
      success: true,
      movement: newMovement,
      warehouseProduct,
      warnings: undefined as string[] | undefined,
      message: undefined as string | undefined,
    }

    // Agregar advertencias si existen
    const warnings = []
    if (stockNegativeWarning) {
      warnings.push(stockNegativeWarning)
    }
    if (storeNegativeWarning) {
      warnings.push(storeNegativeWarning)
    }

    if (warnings.length > 0) {
      response.warnings = warnings
      response.message = 'Movimiento realizado con advertencias de stock'
    }

    return response
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
