import Recipe from '@models/recipe'
import { recipeAttributes } from '@type/production/recipes'
import { createRecipeValidation } from '../../schemas/production/recipeSchema'
import sequelize from '@config/database'
import Product from '@models/product'
import Resource from '@models/resource'
import Production from '@models/production'
import BuysResource from '@models/buysResource'
import serviceCreateWarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'

const serviceCreateRecipe = async (body: recipeAttributes) => {
  const validation = createRecipeValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { productId, resourceId, quantity, unit } = validation.data
  const transaction = await sequelize.transaction()

  try {
    const existingRecipe = await Recipe.findOne({
      where: { productId, resourceId },
      transaction,
    })
    if (existingRecipe) {
      await transaction.rollback()
      return {
        error: 'El ingrediente ya existe en la receta de este producto.',
      }
    }

    // --- INICIO DE LÓGICA RETROACTIVA ---
    const totalProduced = await Production.sum('quantityProduced', {
      where: { productId },
      transaction,
    })

    if (totalProduced > 0) {
      const retroactiveConsumption = totalProduced * quantity

      const resourceStock = await BuysResource.findOne({
        where: { resource_id: resourceId },
        order: [['entry_date', 'DESC']],
        transaction,
      })

      if (!resourceStock || resourceStock.quantity < retroactiveConsumption) {
        await transaction.rollback()
        return {
          error: `Stock insuficiente del recurso para cubrir el consumo histórico. Se necesitan ${retroactiveConsumption}, pero solo hay ${resourceStock?.quantity || 0}.`,
        }
      }

      resourceStock.quantity -= retroactiveConsumption
      await resourceStock.save({ transaction })

      const product = await Product.findByPk(productId, {
        attributes: ['name'],
        transaction,
      })
      const resource = await Resource.findByPk(resourceId, {
        attributes: ['name'],
        transaction,
      })

      const movementPayload = {
        warehouse_id: resourceStock.warehouse_id,
        resource_id: resourceId,
        movement_type: 'salida',
        quantity: retroactiveConsumption,
        movement_date: new Date(),
        observations: `Ajuste retroactivo por añadir '${resource?.name}' a la receta de '${product?.name}'.`,
      }

      const movementResult = await serviceCreateWarehouseMovementResource(
        movementPayload,
        transaction,
      )
      if (movementResult && 'error' in movementResult) {
        throw new Error('No se pudo crear el movimiento de ajuste retroactivo.')
      }
    }
    // --- FIN DE LÓGICA RETROACTIVA ---

    const newRecipe = await Recipe.create(
      { productId, resourceId, quantity, unit },
      { transaction },
    )

    await transaction.commit()
    return newRecipe
  } catch (error) {
    await transaction.rollback()
    console.error('Error en la transacción de serviceCreateRecipe:', error)
    return { error: 'Ocurrió un error inesperado al añadir el ingrediente.' }
  }
}

export default serviceCreateRecipe
