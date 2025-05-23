import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'

const serviceCreateProduction = async (body: productionAttributes) => {
  const validation = productionValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { productId, quantityProduced, productionDate, observation, plant_id } =
    validation.data

  const existingProduct = await Product.findByPk(productId)
  if (!existingProduct) {
    return { error: 'El producto no existe' }
  }

  const existingPlant = await PlantProduction.findByPk(plant_id)
  if (!existingPlant) {
    return { error: 'La planta no existe' }
  }

  // Crear la producción
  const newProduction = await Production.create({
    productId,
    quantityProduced,
    productionDate,
    observation: observation ?? '',
    plant_id,
  })

  return newProduction
}

export default serviceCreateProduction
