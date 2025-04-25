import PlantProduction from '@models/plant_production'

const serviceDeletePlant = async (id: string) => {
  const plant = await PlantProduction.findByPk(id)

  if (!plant) {
    return { error: 'La planta no existe' }
  }

  await plant.destroy()
  return { message: 'Planta eliminada correctamente' }
}

export default serviceDeletePlant
