import Location from '@models/locations'
import { LocationAttributes } from '@type/alquiler/locations'

export default async function updateLocation(
  id: string,
  data: Partial<LocationAttributes>, // ✅ bien hecho: actualización parcial
) {
  try {
    const location = await Location.findByPk(id)

    if (!location) {
      return { error: 'Ubicación no encontrada' } // ✅ control de existencia
    }

    await location.update(data) // ✅ aplica los cambios

    return {
      message: 'Ubicación actualizada exitosamente',
      data: location, // ✅ retorna el objeto actualizado
    }
  } catch (error) {
    console.error('Error actualizando ubicación:', error)

    return {
      error:
        error instanceof Error
          ? `Error al actualizar ubicación: ${error.message}`
          : 'Error interno del servidor',
    }
  }
}
