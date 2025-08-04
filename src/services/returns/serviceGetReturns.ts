import Return from '@models/returns'

type ServiceResult =
  | { success: true; data: Return[] }
  | { error: string; details?: string }

const serviceGetReturns = async (storeId?: string): Promise<ServiceResult> => {
  try {
    const whereClause = storeId ? { store_id: storeId } : {}
    const items = await Return.findAll({
      where: whereClause,
    })
    return { success: true, data: items }
  } catch (error: unknown) {
    return {
      error: 'Error al obtener las devoluciones',
      details: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceGetReturns
