import CashSession from '@models/cashSession'

const serviceGetCashSessions = async () => {
  try {
    const cashSessions = await CashSession.findAll({
      order: [['createdAt', 'DESC']],
    })
    return { success: true, cashSessions }
  } catch (error) {
    console.error('Error getting cash sessions:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al obtener las sesiones de caja',
    }
  }
}

export default serviceGetCashSessions
