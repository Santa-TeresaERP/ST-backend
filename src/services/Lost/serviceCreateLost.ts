// services/Production/serviceCreateLost.ts
import Lost from '@models/lost'
import Production from '@models/production'
import { lostAttributes } from '@type/production/lost'
import PlantProduction from '@models/plant_production'
import WarehouseProduct from '@models/warehouseProduct'
import WarehouseMovementProduct from '@models/warehouseMovementProduct'

// 👇 importa tu colector de gastos por pérdidas (NO modificado)
import createLossesExpense from '@services/GeneralExpense/CollectionFunc/Production/LossesExpense'

export default async function createLost(
  lostData: Omit<lostAttributes, 'id' | 'created_at'>,
) {
  try {
    const production = await Production.findByPk(lostData.production_id)
    if (!production) {
      throw new Error('Producto no encontrado')
    }

    const now = new Date()

    const newLost = await Lost.create({
      production_id: lostData.production_id,
      quantity: lostData.quantity,
      lost_type: lostData.lost_type,
      observations: lostData.observations ?? '',
      created_at: now,
    })

    await production.update({
      quantityProduced: production.quantityProduced - lostData.quantity,
    })

    const plantProduction = await PlantProduction.findByPk(production.plant_id)
    if (!plantProduction) {
      throw new Error('Planta de producción no encontrada')
    }

    const warehouseProduct = await WarehouseProduct.findOne({
      where: {
        product_id: production.productId,
        warehouse_id: plantProduction.warehouse_id,
      },
    })

    if (!warehouseProduct) {
      throw new Error('Producto no encontrado en el almacén')
    }

    await warehouseProduct.update({
      quantity: warehouseProduct.quantity - lostData.quantity,
    })

    await WarehouseMovementProduct.create({
      warehouse_id: plantProduction.warehouse_id,
      product_id: production.productId,
      movement_type: 'Salida',
      quantity: lostData.quantity,
      movement_date: now,
      observations: `Pérdida por ${lostData.lost_type}`,
    })

    // 🔗 Crear el gasto general por pérdidas en producción
    // (no rompe el flujo si falla; solo registra el error)
    try {
      await createLossesExpense({
        production_id: lostData.production_id,
        quantity: lostData.quantity,
        lost_type: lostData.lost_type,
        observations: lostData.observations,
        created_at: now,
      })
    } catch (e) {
      console.error('⚠️ No se pudo crear el gasto por pérdidas:', e)
      // Si prefieres que todo falle cuando el gasto falla, cambia a: throw e
    }

    return newLost
  } catch (error) {
    throw new Error(
      `Error al crear registro de pérdida: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }
}
