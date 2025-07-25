// --- 1. IMPORTACIONES NECESARIAS ---
import WarehouseStore from '@models/warehouseStore';
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore';
import sequelize from '@config/database';
import { updateWarehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema'; 
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product';
import Product from '@models/product'; // Importación necesaria para la relación

const serviceUpdateWarehouseStore = async (
  id: string,
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
    // --- 4. OBTENER EL ESTADO ACTUAL (CON DATOS DEL PRODUCTO) ---
    // [CORREGIDO] Añadimos 'include' para traer el objeto 'product' relacionado.
    const warehouseStore = await WarehouseStore.findByPk(id, { 
      include: [{
        model: Product,
        as: 'product', // 'as' debe coincidir con la definición de tu asociación en el modelo.
        attributes: ['name'] // Opcional: solo traemos el campo 'name' para eficiencia.
      }],
      transaction 
    });

    if (!warehouseStore) {
      await transaction.rollback();
      return { error: 'El registro de inventario a editar no existe.' };
    }

    // [CORREGIDO] Ahora podemos acceder al nombre del producto de forma segura.
    // Usamos 'as any' como una solución práctica si TypeScript no infiere el tipo de la relación.
    const oldQuantity = warehouseStore.quantity;
    const productName = (warehouseStore as any).product.name;

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
        // Usamos la variable 'productName' para la observación.
        observations: `Ajuste de stock para '${productName}'. Cantidad aumentada de ${oldQuantity} a ${newQuantity}.`
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
        // Usamos la variable 'productName' para la observación.
        observations: `Ajuste de stock para '${productName}'. Cantidad reducida de ${oldQuantity} a ${newQuantity}.`
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