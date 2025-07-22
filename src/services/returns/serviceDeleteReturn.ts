import Return from '@models/returns'

type ServiceResult =
  | { success: true; message: string }
  | { error: string; details?: string }

const serviceDeleteReturn = async (id: string): Promise<ServiceResult> => {
  try {
    const item = await Return.findByPk(id)
    if (!item) return { error: 'Devolución no encontrada' }

    await item.destroy()
    return { success: true, message: 'Devolución eliminada correctamente' }
  } catch (error: unknown) {
    return {
      error: 'Error al eliminar la devolución',
      details: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceDeleteReturn
