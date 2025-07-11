import Resource from '@models/resource'

const serviceGetResource = async (id: string) => {
  try {
    const resource = await Resource.findByPk(id)

    if (!resource) {
      return { error: 'Recurso no encontrado' }
    }

    return resource
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al obtener el recurso',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al obtener el recurso' }
  }
}

export default serviceGetResource
