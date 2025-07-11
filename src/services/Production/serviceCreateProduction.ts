import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import WarehouseMovementProduct from '@models/warehouseMovementProduct'
import sequelize from '@config/database' // Importar sequelize para transacciones

const serviceCreateProduction = async (body: productionAttributes) => {
  const validation = productionValidation(body)
  if (!validation.success) return { error: validation.error.errors }

  const { productId, quantityProduced, productionDate, observation, plant_id } =
    validation.data

  // Iniciar transacción
  const t = await sequelize.transaction()

  try {
    const product = await Product.findByPk(productId, { transaction: t })
    if (!product) {
      await t.rollback()
      return { error: 'El producto no existe' }
    }

    const plant = await PlantProduction.findByPk(plant_id, { transaction: t })
    if (!plant) {
      await t.rollback()
      return { error: 'La planta no existe' }
    }

    if (!plant.warehouse_id) {
      await t.rollback()
      return { error: 'La planta de producción no tiene un almacén asociado.' }
    }

    const newProduction = await Production.create(
      {
        productId,
        quantityProduced,
        productionDate,
        observation: observation ?? '',
        plant_id,
      },
      { transaction: t },
    )

    await WarehouseMovementProduct.create(
      {
        warehouse_id: plant.warehouse_id,
        product_id: newProduction.productId,
        movement_type: 'ENTRADA_PRODUCCION',
        quantity: newProduction.quantityProduced,
        movement_date: new Date(newProduction.productionDate),
        observations: `Producción ID: ${newProduction.id}${newProduction.observation ? ' - ' + newProduction.observation : ''}`,
      },
      { transaction: t },
    )

    // Si todo va bien, confirmar la transacción
    await t.commit()

    console.log(
      'Producción y movimiento de almacén creados correctamente en transacción.',
    )

    const datosFinales = {
      id: newProduction.id,
      producto: product.name,
      cantidad_producida: quantityProduced,
      fecha_produccion: productionDate,
      observacion: observation,
      planta: plant.plant_name,
      warehouse_id_movimiento: plant.warehouse_id, // Añadido para referencia
    }
    return datosFinales
  } catch (error) {
    // Si hay algún error, revertir la transacción
    await t.rollback()
    console.error(
      'Error creando producción o movimiento de almacén, transacción revertida:',
      error,
    )
    if (error instanceof Error) {
      return {
        error: 'Error en la transacción',
        message: error.message,
      }
    }
    return { error: 'Error desconocido en la transacción' }
  }
}

export default serviceCreateProduction
