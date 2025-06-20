import BuysResource from '@models/buysResource'

const serviceDeleteBuysResource = async (id: string) => {
  try {
    const deleted = await BuysResource.destroy({
      where: { id },
    })

    if (!deleted) {
      return { error: 'Dato de compra no encontrado o ya eliminado' }
    }

    return { message: 'Dato de compra eliminado correctamente' }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: 'Error al eliminar Dato de compra',
        details: error.message,
      }
    }
    return { error: 'Error desconocido al eliminar el Dato de compra' }
  }
}

export default serviceDeleteBuysResource
