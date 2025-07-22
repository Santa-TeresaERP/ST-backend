import Return from '@models/returns'

type ServiceResult =
  | { success: true; data: Return }
  | { error: string; details?: string }

const serviceGetReturn = async (id: string): Promise<ServiceResult> => {
  try {
    const item = await Return.findByPk(id)
    if (!item) return { error: 'Devolución no encontrada' }
    return { success: true, data: item }
  } catch (error: unknown) {
    return {
      error: 'Error al obtener la devolución',
      details: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceGetReturn
