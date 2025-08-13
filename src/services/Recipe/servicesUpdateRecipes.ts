import Recipe from '@models/recipe'
import { recipeAttributes } from '@type/production/recipes'
import { updateRecipeValidation } from '../../schemas/production/recipeSchema'
import sequelize from '@config/database'
import Product from '@models/product'
import Resource from '@models/resource'
import Production from '@models/production'
import BuysResource from '@models/buysResource'
import serviceCreateWarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'

const serviceUpdateRecipe = async (
  id: string,
  body: Partial<recipeAttributes>,
) => {
  const validation = updateRecipeValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { quantity, unit } = validation.data
  const transaction = await sequelize.transaction()

  try {
    const recipe = await Recipe.findByPk(id, { transaction })
    if (!recipe) {
      await transaction.rollback()
      return { error: 'El ítem de la receta no existe.' }
    }

    const oldQuantity = recipe.quantity
    const difference = (quantity || oldQuantity) - oldQuantity

    if (difference !== 0) {
      const totalProduced = await Production.sum('quantityProduced', {
        where: { productId: recipe.productId },
        transaction,
      })

      if (totalProduced > 0) {
        const stockAdjustment = totalProduced * difference
        const resourceStock = await BuysResource.findOne({
          where: { resource_id: recipe.resourceId },
          order: [['entry_date', 'DESC']],
          transaction,
        })

        if (!resourceStock) {
          await transaction.rollback()
          return { error: `No se encontró stock para el recurso.` }
        }

        // Si se necesita más stock (difference > 0), comprobamos si hay suficiente
        if (stockAdjustment > 0 && resourceStock.quantity < stockAdjustment) {
          await transaction.rollback()
          return {
            error: `Stock insuficiente para el ajuste. Se necesitan ${stockAdjustment}.`,
          }
        }

        resourceStock.quantity -= stockAdjustment // Resta si es positivo, suma si es negativo
        await resourceStock.save({ transaction })

        const product = await Product.findByPk(recipe.productId, {
          attributes: ['name'],
          transaction,
        })
        const resource = await Resource.findByPk(recipe.resourceId, {
          attributes: ['name'],
          transaction,
        })

        const movementPayload = {
          warehouse_id: resourceStock.warehouse_id,
          resource_id: recipe.resourceId,
          movement_type: stockAdjustment > 0 ? 'salida' : 'entrada',
          quantity: Math.abs(stockAdjustment),
          movement_date: new Date(),
          observations: `Ajuste de stock para '${product?.name}'. Cantidad de '${resource?.name}' ${stockAdjustment > 0 ? 'aumentada' : 'reducida'} de ${oldQuantity} a ${quantity}.`,
        }

        await serviceCreateWarehouseMovementResource(
          movementPayload,
          transaction,
        )
      }
    }

    await recipe.update({ quantity, unit }, { transaction })
    await transaction.commit()
    return recipe
  } catch (error) {
    await transaction.rollback()
    console.error('Error en la transacción de serviceUpdateRecipe:', error)
    return {
      error: 'Ocurrió un error inesperado al actualizar el ingrediente.',
    }
  }
}

export default serviceUpdateRecipe
