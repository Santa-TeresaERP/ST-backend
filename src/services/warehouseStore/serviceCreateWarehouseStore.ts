// --- IMPORTACIONES DE LA VERSIÓN CORRECTA ---
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { createWarehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema' // Asegúrate de usar la validación de CREACIÓN
import sequelize from '@config/database'
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product'
import WarehouseStore from '@models/warehouseStore'
import Product from '@models/product'
import Store from '@models/store'

const serviceCreateWarehouseStore = async (body: warehouseStoreAttributes) => {
  // 1. VALIDACIÓN INICIAL
  const validation = createWarehouseStoreValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { storeId, productId, quantity } = validation.data

  // 2. INICIAR TRANSACCIÓN
  const transaction = await sequelize.transaction()

  try {
    // 3. PREPARAR PAYLOAD PARA EL SERVICIO DE MOVIMIENTOS
    const movementPayload = {
      warehouse_id: '700971b1-e025-413d-bce0-7ece97d1ca9c', // Tu ID de almacén principal
      store_id: storeId,
      product_id: productId,
      movement_type: 'salida',
      quantity: quantity,
      movement_date: new Date(),
      observations: `Registro inicial de stock para el producto ID: ${productId} en la tienda ID: ${storeId}`,
    }

    // 4. DELEGAR LA TAREA AL SERVICIO DE MOVIMIENTOS
    const movementResult = await serviceCreatewarehouseMovementProduct(
      movementPayload,
      transaction,
    )

    // 5. VERIFICAR EL RESULTADO
    if (!movementResult.success) {
      await transaction.rollback()
      return {
        error:
          movementResult.error || 'Error al procesar el movimiento de almacén.',
      }
    }

    // 6. CONFIRMAR LA TRANSACCIÓN
    await transaction.commit()

    // 7. DEVOLVER LA RESPUESTA ESPERADA
    const finalWarehouseStore = await WarehouseStore.findOne({
      where: { storeId, productId },
      include: [
        { model: Product, as: 'product' },
        { model: Store, as: 'store' },
      ],
    })

    return finalWarehouseStore
  } catch (error) {
    // 8. MANEJO DE ERRORES Y REVERSIÓN
    await transaction.rollback()
    console.error(
      'Error catastrófico en la transacción de serviceCreateWarehouseStore:',
      error,
    )
    return { error: 'Ocurrió un error inesperado al registrar el inventario.' }
  }
}

export default serviceCreateWarehouseStore
