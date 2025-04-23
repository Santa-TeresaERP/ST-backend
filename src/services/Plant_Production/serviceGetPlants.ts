import PlantProduction from '@models/plant_production'

const serviceGetPlants = async () => {
  const plants = await PlantProduction.findAll()
  return plants
}

export default serviceGetPlants
