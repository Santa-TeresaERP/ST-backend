import Location from '@models/locations'

export default async function deleteLocation(id: string) {
  try {
    const location = await Location.findByPk(id)
    if (!location) {
      throw new Error('Ubicación no encontrada')
    }

    await location.destroy()

    return { message: 'Ubicación eliminada exitosamente' }
  } catch (error) {
    throw new Error(
      `Error al eliminar ubicación: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
