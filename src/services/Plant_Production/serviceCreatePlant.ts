import PlantProduction from '@models/plant_production'
import { plant_productionAttributes } from '@type/production/plant_production'
import { plantProductionValidation } from '../../schemas/production/plant_productionSchema'

const serviceCreatePlant = async (body: plant_productionAttributes) => {
  // Validar los datos usando el esquema
  const validation = plantProductionValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { plant_name, address, warehouse_id } = validation.data

  // Verificar si ya existe una planta con el mismo nombre
  const existing = await PlantProduction.findOne({ where: { plant_name } })
  if (existing) {
    return { error: 'La planta de producción ya existe' }
  }

  // Crear la nueva planta
  const newPlant = await PlantProduction.create({
    plant_name,
    address,
    warehouse_id, // Nuevo campo agregado
  })

  return newPlant
}

export default serviceCreatePlant
