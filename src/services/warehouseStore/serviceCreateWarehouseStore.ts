<<<<<<< Updated upstream
import WarehouseStore from '@models/warehouseStore'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { warehouseStoreValidation } from 'src/schemas/ventas/warehouseStoreSchema'
=======
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore';
import { warehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema';
import sequelize from '@config/database'; // Importar la instancia de Sequelize para transacciones
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product';
import WarehouseStore from '@models/warehouseStore';
import Product from '@models/product';
import Store from '@models/store';
>>>>>>> Stashed changes

const serviceCreateWarehouseStore = async (body: warehouseStoreAttributes) => {
  // 1. VALIDACIÓN INICIAL: Se asegura de que el frontend envíe los datos mínimos requeridos (productId, storeId, quantity).
  const validation = warehouseStoreValidation(body);
  if (!validation.success) {
    return { error: validation.error.errors };
  }

  const { storeId, productId, quantity } = validation.data;

  // Iniciar una transacción de base de datos.
  // Esto garantiza que todas las operaciones (actualizar stock, crear movimiento, crear inventario)
  // se completen con éxito, o ninguna lo haga, evitando inconsistencias en los datos.
  const transaction = await sequelize.transaction();

  try {
    // 2. PREPARAR EL PAYLOAD: Traduce la simple petición del frontend a una orden de movimiento completa.
    const movementPayload = {
      // ---- ¡IMPORTANTE! ----
      warehouse_id: '700971b1-e025-413d-bce0-7ece97d1ca9c', 
      
      store_id: storeId,
      product_id: productId,
      
      // Un registro de stock en una tienda siempre es una "salida" del almacén principal.
      movement_type: 'salida', 
      
      quantity: quantity,
      movement_date: new Date(),
      observations: `Registro inicial de stock para el producto ID: ${productId} en la tienda ID: ${storeId}`,
    };

    // 3. DELEGAR LA TAREA: Llama al servicio de movimientos, que contiene toda la lógica compleja.
    // Le pasamos la transacción para que todas sus operaciones internas formen parte de la misma unidad atómica.
    const movementResult = await serviceCreatewarehouseMovementProduct(movementPayload, transaction);

    // 4. VERIFICAR EL RESULTADO: Comprueba si el servicio de movimiento tuvo éxito.
    if (!movementResult.success) {
      // Si el servicio de movimiento falló (ej. stock insuficiente), se revierte toda la operación.
      await transaction.rollback();
      // Se devuelve el error específico que proporcionó el servicio de movimiento.
      return { error: movementResult.error || 'Error al procesar el movimiento de almacén.' };
    }

    // 5. CONFIRMAR LA TRANSACCIÓN: Si el movimiento fue exitoso, se guardan permanentemente todos los cambios en la base de datos.
    await transaction.commit();

    // 6. DEVOLVER LA RESPUESTA ESPERADA: Para mantener la consistencia de la API, buscamos y devolvemos el registro
    // de WarehouseStore que el servicio de movimiento acaba de crear o actualizar.
    const finalWarehouseStore = await WarehouseStore.findOne({
      where: { storeId, productId },
      // Opcional: Incluir los modelos de Product y Store si el frontend espera una respuesta enriquecida.
      include: [
        { model: Product, as: 'product' },
        { model: Store, as: 'store' },
      ],
    });

    return finalWarehouseStore;

  } catch (error) {
    // CAPTURA DE ERRORES INESPERADOS: Si algo más falla (ej. la conexión a la BD),
    // se asegura de revertir la transacción para no dejar datos corruptos.
    await transaction.rollback();
    console.error('Error catastrófico en la transacción de serviceCreateWarehouseStore:', error);
    return { error: 'Ocurrió un error inesperado al registrar el inventario.' };
  }
};

export default serviceCreateWarehouseStore;