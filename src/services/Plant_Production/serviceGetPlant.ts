import PlantProduction from '@models/plant_production'

const serviceGetPlant = async (id: string) => {
  const plant = await PlantProduction.findByPk(id)

  if (!plant) {
    return { error: 'La planta no existe' }
  }

  return plant
}

export default serviceGetPlant
