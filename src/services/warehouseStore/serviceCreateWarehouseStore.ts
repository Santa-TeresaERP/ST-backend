import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { createWarehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema'
import sequelize from '@config/database'
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product'
import WarehouseStore from '@models/warehouseStore'
import Product from '@models/product'
import Store from '@models/store'
import Warehouse from '@models/warehouse'

const serviceCreateWarehouseStore = async (body: warehouseStoreAttributes) => {
  // 1. VALIDACIÓN INICIAL
  const validation = createWarehouseStoreValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { storeId, productId, quantity } = validation.data

  // 2. OBTENER NOMBRES PARA OBSERVACIONES LEGIBLES
  const product = await Product.findByPk(productId)
  const store = await Store.findByPk(storeId)

  // Verificamos que ambos existan antes de continuar
  if (!product) {
    return { error: `El producto con ID ${productId} no fue encontrado.` }
  }
  if (!store) {
    return { error: `La tienda con ID ${storeId} no fue encontrada.` }
  }

  // 3. OBTENER EL ALMACÉN PRINCIPAL (Almacen monasterio)
  const defaultWarehouse = await Warehouse.findOne({
    where: { name: 'Almacen monasterio' },
  })

  if (!defaultWarehouse) {
    return {
      error: 'El almacén principal "Almacen monasterio" no está disponible.',
    }
  }

  // 4. INICIAR TRANSACCIÓN
  const transaction = await sequelize.transaction()

  try {
    // 5. PREPARAR PAYLOAD DEL MOVIMIENTO CON OBSERVACIÓN LEGIBLE
    const movementPayload = {
      warehouse_id: defaultWarehouse.id,
      store_id: storeId,
      product_id: productId,
      movement_type: 'salida',
      quantity: quantity,
      movement_date: new Date(),
      observations: `Registro inicial de ${quantity} unidad(es) de '${product.name}' en la tienda '${store.store_name}'.`,
    }

    // 6. DELEGAR LA TAREA AL SERVICIO DE MOVIMIENTOS
    const movementResult = await serviceCreatewarehouseMovementProduct(
      movementPayload,
      transaction,
    )

    if (!movementResult.success) {
      await transaction.rollback()
      return {
        error:
          movementResult.error || 'Error al procesar el movimiento de almacén.',
      }
    }

    // 7. CONFIRMAR LA TRANSACCIÓN
    await transaction.commit()

    // 8. RETORNAR EL RESULTADO FINAL CON RELACIONES
    const finalWarehouseStore = await WarehouseStore.findOne({
      where: { storeId, productId },
      include: [
        { model: Product, as: 'product' },
        { model: Store, as: 'store' },
      ],
    })

    return finalWarehouseStore
  } catch (error) {
    // 9. MANEJO DE ERRORES Y REVERSIÓN
    await transaction.rollback()
    console.error(
      'Error catastrófico en la transacción de serviceCreateWarehouseStore:',
      error,
    )
    return { error: 'Ocurrió un error inesperado al registrar el inventario.' }
  }
}

export default serviceCreateWarehouseStore
