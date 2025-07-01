import PlantProduction from '@models/plant_production'

const serviceDeletePlant = async (id: string) => {
  const plant = await PlantProduction.findByPk(id)

  if (!plant) {
    return { error: 'La planta no existe' }
  }

  // Cambiar el status a false en lugar de eliminar
  plant.status = false
  await plant.save()

  return { message: 'Planta desactivada correctamente' }
}

export default serviceDeletePlant
