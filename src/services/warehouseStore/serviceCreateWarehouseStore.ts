import { warehouseStoreAttributes } from '@type/ventas/warehouseStore';
import { createWarehouseStoreValidation } from '../../schemas/ventas/warehouseStoreSchema';
import sequelize from '@config/database';
import serviceCreatewarehouseMovementProduct from '../warehouse_movement_product/serviceCreatewarehouse_movement_product';
import WarehouseStore from '@models/warehouseStore';
import Product from '@models/product';
import Store from '@models/store';

const serviceCreateWarehouseStore = async (body: warehouseStoreAttributes) => {
  const validation = createWarehouseStoreValidation(body);
  if (!validation.success) {
    return { error: validation.error.errors };
  }

  const { storeId, productId, quantity } = validation.data;

  // --- INICIO DE LA MODIFICACIÓN ---

  // Para crear una observación legible, necesitamos los nombres.
  const product = await Product.findByPk(productId);
  const store = await Store.findByPk(storeId);

  // Verificamos que ambos existan antes de continuar.
  if (!product) return { error: `El producto con ID ${productId} no fue encontrado.` };
  if (!store) return { error: `La tienda con ID ${storeId} no fue encontrada.` };

  // --- FIN DE LA MODIFICACIÓN ---

  const transaction = await sequelize.transaction();

  try {
    const movementPayload = {
      warehouse_id: '700971b1-e025-413d-bce0-7ece97d1ca9c',
      store_id: storeId,
      product_id: productId,
      movement_type: 'salida', 
      quantity: quantity,
      movement_date: new Date(),
      // [OBSERVACIÓN ACTUALIZADA] Usamos los nombres obtenidos.
      observations: `Registro inicial de ${quantity} unidad(es) de '${product.name}' en la tienda '${store.store_name}'.`,
    };

    const movementResult = await serviceCreatewarehouseMovementProduct(movementPayload, transaction);

    if (!movementResult.success) {
      await transaction.rollback();
      return { error: movementResult.error || 'Error al procesar el movimiento de almacén.' };
    }

    await transaction.commit();

    const finalWarehouseStore = await WarehouseStore.findOne({
      where: { storeId, productId },
      include: [
        { model: Product, as: 'product' },
        { model: Store, as: 'store' },
      ],
    });

    return finalWarehouseStore;

  } catch (error) {
    await transaction.rollback();
    console.error('Error catastrófico en la transacción de serviceCreateWarehouseStore:', error);
    return { error: 'Ocurrió un error inesperado al registrar el inventario.' };
  }
};

export default serviceCreateWarehouseStore;