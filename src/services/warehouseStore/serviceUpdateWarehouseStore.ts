<<<<<<< Updated upstream
import WarehouseStore from '@models/warehouseStore'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { warehouseStoreValidation } from 'src/schemas/ventas/warehouseStoreSchema'
=======
// --- 1. IMPORTACIONES NECESARIAS ---
import WarehouseStore from '@models/warehouseStore';
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore';
import sequelize from '@config/database'; // Corregida la importación por defecto

// Se importa la función de validación desde tu NUEVO archivo de schema.
import { updateWarehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema'; 

// Se importa el servicio de creación de movimientos.
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product';
>>>>>>> Stashed changes

const serviceUpdateWarehouseStore = async (
  id: string, // ID del registro en WarehouseStore (el inventario de la tienda)
  body: warehouseStoreAttributes,
) => {
  // --- 2. VALIDAR LA ENTRADA ---
  // Se usa el nuevo schema que solo valida 'quantity'.
  const validation = updateWarehouseStoreValidation(body);
  if (!validation.success) {
    return { error: validation.error.errors };
  }
  // Esta es la nueva cantidad que el usuario quiere en la tienda.
  const newQuantity = validation.data.quantity;

  // --- 3. INICIAR TRANSACCIÓN ---
  const transaction = await sequelize.transaction();

  try {
    // --- 4. OBTENER EL ESTADO ACTUAL ---
    // Buscamos el registro actual del inventario de la tienda para saber la cantidad antigua.
    const warehouseStore = await WarehouseStore.findByPk(id, { transaction });
    if (!warehouseStore) {
      await transaction.rollback();
      return { error: 'El registro de inventario a editar no existe.' };
    }
    const oldQuantity = warehouseStore.quantity;

    // --- 5. CALCULAR LA DIFERENCIA (EL "DELTA") ---
    const difference = newQuantity - oldQuantity;

    // Si la cantidad no ha cambiado, no hacemos nada y terminamos con éxito.
    if (difference === 0) {
      await transaction.commit();
      return warehouseStore;
    }
    
    // --- 6. PREPARAR Y EJECUTAR EL MOVIMIENTO DE AJUSTE ---
    let movementPayload;
    if (difference > 0) {
      // CASO: AUMENTAR STOCK EN TIENDA (necesita una "salida" del almacén)
      movementPayload = {
        warehouse_id: '700971b1-e025-413d-bce0-7ece97d1ca9c', // Tu ID de almacén principal
        store_id: warehouseStore.storeId,
        product_id: warehouseStore.productId,
        movement_type: 'salida',
        quantity: difference, // La cantidad del movimiento es solo la diferencia
        movement_date: new Date(),
        observations: `Ajuste de stock. Cantidad aumentada de ${oldQuantity} a ${newQuantity}.`
      };
    } else { 
      // CASO: REDUCIR STOCK EN TIENDA (necesita una "entrada" al almacén)
      const quantityToReturn = Math.abs(difference); // El valor debe ser positivo
      movementPayload = {
        warehouse_id: '700971b1-e025-413d-bce0-7ece97d1ca9c', // Tu ID de almacén principal
        store_id: warehouseStore.storeId,
        product_id: warehouseStore.productId,
        movement_type: 'entrada',
        quantity: quantityToReturn,
        movement_date: new Date(),
        observations: `Ajuste de stock. Cantidad reducida de ${oldQuantity} a ${newQuantity}.`
      };
    }

    // Se llama al servicio de movimientos para que valide y actualice el stock del almacén.
    const movementResult = await serviceCreatewarehouseMovementProduct(movementPayload, transaction);

    if (!movementResult.success) {
      // Si el servicio de movimiento falla (ej. stock insuficiente), se revierte todo.
      await transaction.rollback();
      return { error: movementResult.error || "El ajuste de inventario no pudo ser procesado." };
    }

    // --- 7. ACTUALIZAR LA CANTIDAD EN LA TIENDA ---
    // El servicio de movimiento ya se encarga de esto, pero lo hacemos explícitamente
    // para asegurar que el valor final sea el que el usuario solicitó.
    warehouseStore.quantity = newQuantity;
    await warehouseStore.save({ transaction });

    // --- 8. CONFIRMAR LA TRANSACCIÓN ---
    await transaction.commit();

    // Se devuelve el registro de la tienda actualizado.
    return warehouseStore;

  } catch (error) {
    // --- 9. REVERTIR EN CASO DE ERROR INESPERADO ---
    await transaction.rollback();
    console.error('Error en la transacción de actualización de inventario:', error);
    return { error: 'Ocurrió un error inesperado al actualizar el inventario.' };
  }
};

export default serviceUpdateWarehouseStore;