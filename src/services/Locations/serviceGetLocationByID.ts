import Location from '@models/locations'

export default async function getLocationById(id: string) {
  try {
    const location = await Location.findByPk(id)

    if (!location) {
      throw new Error('Ubicación no encontrada')
    }

    return location
  } catch (error) {
    throw new Error(
      `Error al obtener ubicación: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
