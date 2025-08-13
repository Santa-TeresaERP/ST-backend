import Location from '@models/locations'
import { LocationAttributes } from '@type/alquiler/locations'

export default async function createLocation(
  data: Omit<LocationAttributes, 'id'>,
) {
  try {
    // Validación simple (puedes extenderla o usar Zod/Joi si gustas)
    if (!data.name || !data.address || data.capacity == null || !data.status) {
      throw new Error(
        'Todos los campos son obligatorios: name, address, capacity, status',
      )
    }

    const newLocation = await Location.create(data)
    return {
      message: 'Ubicación creada exitosamente',
      data: newLocation,
    }
  } catch (error) {
    throw new Error(
      `Error al crear ubicación: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
