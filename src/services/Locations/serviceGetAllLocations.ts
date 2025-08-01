import Location from '@models/locations'

export default async function getAllLocations() {
  try {
    const locations = await Location.findAll()
    return locations
  } catch (error) {
    throw new Error(
      `Error al obtener ubicaciones: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
