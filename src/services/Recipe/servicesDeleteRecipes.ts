import Recipe from '@models/recipe'
import sequelize from '@config/database'
import Product from '@models/product'
import Resource from '@models/resource'
import Production from '@models/production'
import BuysResource from '@models/buysResource'
import serviceCreateWarehouseMovementResource from '../warehouseMovementResource/serviceCreateWarehouseMovementResource'

const serviceDeleteRecipe = async (id: string) => {
  const transaction = await sequelize.transaction()
  try {
    const recipe = await Recipe.findByPk(id, { transaction })
    if (!recipe) {
      await transaction.rollback()
      return { error: 'El ítem de la receta no existe.' }
    }

    const totalProduced = await Production.sum('quantityProduced', {
      where: { productId: recipe.productId },
      transaction,
    })

    if (totalProduced > 0) {
      const quantityToReturn = totalProduced * recipe.quantity

      const resourceStock = await BuysResource.findOne({
        where: { resource_id: recipe.resourceId },
        order: [['entry_date', 'DESC']],
        transaction,
      })

      if (resourceStock) {
        resourceStock.quantity += quantityToReturn
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
          movement_type: 'entrada',
          quantity: quantityToReturn,
          movement_date: new Date(),
          observations: `Devolución de stock por eliminación de '${resource?.name}' de la receta de '${product?.name}'.`,
        }

        await serviceCreateWarehouseMovementResource(
          movementPayload,
          transaction,
        )
      }
    }

    await recipe.destroy({ transaction })
    await transaction.commit()
    return {
      message:
        'Ingrediente eliminado y stock histórico devuelto correctamente.',
    }
  } catch (error) {
    await transaction.rollback()
    console.error('Error en la transacción de serviceDeleteRecipe:', error)
    return { error: 'Ocurrió un error inesperado al eliminar el ingrediente.' }
  }
}

export default serviceDeleteRecipe
