import WarehouseResource from '@models/warehouseResource'

const serviceGetWarehouseResources = async () => {
  try {
    const resources = await WarehouseResource.findAll()
    return resources
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al obtener los recursos del almacén',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al obtener los recursos del almacén' }
  }
}

export default serviceGetWarehouseResources
