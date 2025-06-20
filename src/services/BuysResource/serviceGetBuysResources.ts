import BuysResource from '@models/buysResource'

const serviceGetBuysResources = async () => {
  try {
    const resources = await BuysResource.findAll()
    return resources
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al obtener los Datos de compra',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al obtener los Datos de compra' }
  }
}

export default serviceGetBuysResources
