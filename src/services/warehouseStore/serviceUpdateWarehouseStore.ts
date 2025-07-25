// --- 1. IMPORTACIONES NECESARIAS ---
import WarehouseStore from '@models/warehouseStore';
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore';
import sequelize from '@config/database'; // Importación por defecto

// Se importa la función de validación desde el schema de actualización.
// Asegúrate de que el schema de actualización solo valide 'quantity'.
import { updateWarehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema'; 

// Se importa el servicio de creación de movimientos.
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product';

const serviceUpdateWarehouseStore = async (
  id: string, // ID del registro en WarehouseStore (el inventario de la tienda)
  body: warehouseStoreAttributes,
) => {
  // --- 2. VALIDAR LA ENTRADA ---
  const validation = updateWarehouseStoreValidation(body);
  if (!validation.success) {
    return { error: validation.error.errors };
  }
  const newQuantity = validation.data.quantity;

  // --- 3. INICIAR TRANSACCIÓN ---
  const transaction = await sequelize.transaction();

  try {
    // --- 4. OBTENER EL ESTADO ACTUAL ---
    const warehouseStore = await WarehouseStore.findByPk(id, { transaction });
    if (!warehouseStore) {
      await transaction.rollback();
      return { error: 'El registro de inventario a editar no existe.' };
    }
    const oldQuantity = warehouseStore.quantity;

    // --- 5. CALCULAR LA DIFERENCIA (EL "DELTA") ---
    const difference = newQuantity - oldQuantity;

    if (difference === 0) {
      await transaction.commit();
      return warehouseStore;
    }
    
    // --- 6. PREPARAR Y EJECUTAR EL MOVIMIENTO DE AJUSTE ---
    let movementPayload;
    if (difference > 0) {
      // CASO: AUMENTAR STOCK EN TIENDA (salida del almacén)
      movementPayload = {
        warehouse_id: '700971b1-e025-413d-bce0-7ece97d1ca9c',
        store_id: warehouseStore.storeId,
        product_id: warehouseStore.productId,
        movement_type: 'salida',
        quantity: difference,
        movement_date: new Date(),
        observations: `Ajuste de stock. Cantidad aumentada de ${oldQuantity} a ${newQuantity}.`
      };
    } else { 
      // CASO: REDUCIR STOCK EN TIENDA (entrada al almacén)
      const quantityToReturn = Math.abs(difference);
      movementPayload = {
        warehouse_id: '700971b1-e025-413d-bce0-7ece97d1ca9c',
        store_id: warehouseStore.storeId,
        product_id: warehouseStore.productId,
        movement_type: 'entrada',
        quantity: quantityToReturn,
        movement_date: new Date(),
        observations: `Ajuste de stock. Cantidad reducida de ${oldQuantity} a ${newQuantity}.`
      };
    }

    const movementResult = await serviceCreatewarehouseMovementProduct(movementPayload, transaction);

    if (!movementResult.success) {
      await transaction.rollback();
      return { error: movementResult.error || "El ajuste de inventario no pudo ser procesado." };
    }

    // --- 7. ACTUALIZAR LA CANTIDAD EN LA TIENDA ---
    warehouseStore.quantity = newQuantity;
    await warehouseStore.save({ transaction });

    // --- 8. CONFIRMAR LA TRANSACCIÓN ---
    await transaction.commit();

    return warehouseStore;

  } catch (error) {
    // --- 9. REVERTIR EN CASO DE ERROR INESPERADO ---
    await transaction.rollback();
    console.error('Error en la transacción de actualización de inventario:', error);
    return { error: 'Ocurrió un error inesperado al actualizar el inventario.' };
  }
};

export default serviceUpdateWarehouseStore;