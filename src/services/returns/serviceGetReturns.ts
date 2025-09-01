import Return from '@models/returns'

type ServiceResult =
  | { success: true; data: Return[] }
  | { error: string; details?: string }

const serviceGetReturns = async (storeId?: string): Promise<ServiceResult> => {
  try {
    const whereClause = storeId ? { storeId: storeId } : {}
    const items = await Return.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente
    })
    return { success: true, data: items }
  } catch (error: unknown) {
    console.error('Error in serviceGetReturns:', error)
    return {
      error: 'Error al obtener las devoluciones',
      details: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceGetReturns
