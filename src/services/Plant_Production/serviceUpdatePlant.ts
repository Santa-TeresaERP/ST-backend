import PlantProduction from '@models/plant_production'
import { plant_productionAttributes } from '@type/production/plant_production'
import { plantProductionValidation } from 'src/schemas/production/plant_productionSchema'

const serviceUpdatePlant = async (
  id: string,
  body: plant_productionAttributes,
) => {
  // Validar los datos usando el esquema
  const validation = plantProductionValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { plant_name, address, warehouse_id } = validation.data

  // Buscar la planta por ID
  const plant = await PlantProduction.findByPk(id)
  if (!plant) {
    return { error: 'La planta no existe' }
  }

  // Actualizar los campos
  await plant.update({
    plant_name,
    address,
    warehouse_id, // Nuevo campo agregado
  })

  return plant
}

export default serviceUpdatePlant
