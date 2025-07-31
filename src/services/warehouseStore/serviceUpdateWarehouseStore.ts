import WarehouseStore from '@models/warehouseStore'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import sequelize from '@config/database'
import { updateWarehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema'
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product'
import Product from '@models/product'
import Warehouse from '@models/warehouse'

const serviceUpdateWarehouseStore = async (
  id: string,
  body: warehouseStoreAttributes,
) => {
  // --- 2. VALIDAR LA ENTRADA ---
  const validation = updateWarehouseStoreValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const newQuantity = validation.data.quantity

  // --- 3. OBTENER EL ALMACÉN PRINCIPAL (Almacen monasterio) ---
  const defaultWarehouse = await Warehouse.findOne({
    where: { name: 'Almacen monasterio' },
  })

  if (!defaultWarehouse) {
    return {
      error: 'El almacén principal "Almacen monasterio" no está disponible.',
    }
  }

  // --- 4. INICIAR TRANSACCIÓN ---
  const transaction = await sequelize.transaction()

  try {
    // --- 5. OBTENER EL ESTADO ACTUAL CON DATOS DEL PRODUCTO ---
    const warehouseStore = await WarehouseStore.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['name'],
        },
      ],
      transaction,
    })

    if (!warehouseStore) {
      await transaction.rollback()
      return { error: 'El registro de inventario a editar no existe.' }
    }

    const oldQuantity = warehouseStore.quantity
    const productName = (
      warehouseStore as WarehouseStore & {
        product: { name: string }
      }
    ).product.name

    // --- 6. CALCULAR LA DIFERENCIA (EL "DELTA") ---
    const difference = newQuantity - oldQuantity

    if (difference === 0) {
      await transaction.commit()
      return warehouseStore
    }

    // --- 7. PREPARAR Y EJECUTAR EL MOVIMIENTO DE AJUSTE ---
    let movementPayload
    if (difference > 0) {
      // CASO: AUMENTAR STOCK EN TIENDA (salida del almacén)
      movementPayload = {
        warehouse_id: defaultWarehouse.id,
        store_id: warehouseStore.storeId,
        product_id: warehouseStore.productId,
        movement_type: 'salida',
        quantity: difference,
        movement_date: new Date(),
        observations: `Ajuste de stock para '${productName}'. Cantidad aumentada de ${oldQuantity} a ${newQuantity}.`,
      }
    } else {
      // CASO: REDUCIR STOCK EN TIENDA (entrada al almacén)
      const quantityToReturn = Math.abs(difference)
      movementPayload = {
        warehouse_id: defaultWarehouse.id,
        store_id: warehouseStore.storeId,
        product_id: warehouseStore.productId,
        movement_type: 'entrada',
        quantity: quantityToReturn,
        movement_date: new Date(),
        observations: `Ajuste de stock para '${productName}'. Cantidad reducida de ${oldQuantity} a ${newQuantity}.`,
      }
    }

    const movementResult = await serviceCreatewarehouseMovementProduct(
      movementPayload,
      transaction,
    )

    if (!movementResult.success) {
      await transaction.rollback()
      return {
        error:
          movementResult.error ||
          'El ajuste de inventario no pudo ser procesado.',
      }
    }

    // --- 8. ACTUALIZAR LA CANTIDAD EN LA TIENDA ---
    warehouseStore.quantity = newQuantity
    await warehouseStore.save({ transaction })

    // --- 9. CONFIRMAR LA TRANSACCIÓN ---
    await transaction.commit()

    return warehouseStore
  } catch (error) {
    // --- 10. REVERTIR EN CASO DE ERROR INESPERADO ---
    await transaction.rollback()
    console.error(
      'Error en la transacción de actualización de inventario:',
      error,
    )
    return { error: 'Ocurrió un error inesperado al actualizar el inventario.' }
  }
}

export default serviceUpdateWarehouseStore
