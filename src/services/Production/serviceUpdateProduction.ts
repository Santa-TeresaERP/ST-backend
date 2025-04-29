import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'

const serviceUpdateProduction = async (
  id: string,
  body: productionAttributes,
) => {
  const validation = productionValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { productId, quantityProduced, productionDate, observation, plant_id } =
    validation.data

  const production = await Production.findByPk(id)
  if (!production) {
    return { error: 'El registro de producción no existe' }
  }

  // Verify product exists
  if (productId) {
    const existingProduct = await Product.findByPk(productId)
    if (!existingProduct) {
      return { error: 'El producto no existe' }
    }
  }

  // Verify plant exists
  if (plant_id) {
    const existingPlant = await PlantProduction.findByPk(plant_id)
    if (!existingPlant) {
      return { error: 'La planta no existe' }
    }
  }

  await production.update({
    productId,
    quantityProduced,
    productionDate,
    observation,
    plant_id,
  })

  return production
}

export default serviceUpdateProduction
