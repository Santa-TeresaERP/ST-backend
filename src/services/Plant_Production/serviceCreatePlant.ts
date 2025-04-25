import PlantProduction from '@models/plant_production'
import { plant_productionAttributes } from '@type/production/plant_production'
import { plantProductionValidation } from 'src/schemas/plant_productionSchema'

const serviceCreatePlant = async (body: plant_productionAttributes) => {
  const validation = plantProductionValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { plant_name, address } = validation.data

  const existing = await PlantProduction.findOne({ where: { plant_name } })
  if (existing) {
    return { error: 'La planta de producción ya existe' }
  }

  const newPlant = await PlantProduction.create({
    plant_name,
    address: typeof address === 'string' ? address : address.toISOString(),
  })
  return newPlant
}

export default serviceCreatePlant
