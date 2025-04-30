import PlantProduction from '@models/plant_production'
import { plant_productionAttributes } from '@type/production/plant_production'
import { plantProductionValidation } from 'src/schemas/production/plant_productionSchema'

const serviceUpdatePlant = async (
  id: string,
  body: plant_productionAttributes,
) => {
  // Asegúrate de que este tipo esté correctamente definido y exportado

  const validation = plantProductionValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { plant_name, address } = validation.data

  const plant = await PlantProduction.findByPk(id)
  if (!plant) {
    return { error: 'La planta no existe' }
  }

  const addressToUpdate = address instanceof Date ? address : new Date(address)

  await plant.update({
    plant_name,
    address: addressToUpdate,
  })

  return plant
}

export default serviceUpdatePlant
