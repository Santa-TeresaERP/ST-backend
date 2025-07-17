import CashSession from '@models/cashSession'

const serviceGetCashSessionById = async (id: string) => {
  try {
    const cashSession = await CashSession.findByPk(id)
    if (!cashSession) {
      return { success: false, error: 'Sesión de caja no encontrada' }
    }

    return { success: true, cashSession }
  } catch (error) {
    console.error('Error getting cash session by ID:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al obtener la sesión de caja',
    }
  }
}

export default serviceGetCashSessionById
