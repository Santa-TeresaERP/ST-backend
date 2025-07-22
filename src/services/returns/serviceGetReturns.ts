import Return from '@models/returns'

type ServiceResult =
  | { success: true; data: Return[] }
  | { error: string; details?: string }

const serviceGetReturns = async (): Promise<ServiceResult> => {
  try {
    const items = await Return.findAll()
    return { success: true, data: items }
  } catch (error: unknown) {
    return {
      error: 'Error al obtener las devoluciones',
      details: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceGetReturns
