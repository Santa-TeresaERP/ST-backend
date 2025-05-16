import WarehouseResource from '@models/warehouseResource'

const serviceDeleteWarehouseResource = async (id: string) => {
  try {
    const deleted = await WarehouseResource.destroy({
      where: { id },
    })

    if (!deleted) {
      return { error: 'Recurso de almacén no encontrado o ya eliminado' }
    }

    return { message: 'Recurso de almacén eliminado correctamente' }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al eliminar el recurso de almacén',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al eliminar el recurso de almacén' }
  }
}

export default serviceDeleteWarehouseResource
