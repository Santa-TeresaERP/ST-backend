import CashSession from '@models/cashSession'
import { CashSessionAttributes } from '@type/ventas/cashSession'

const serviceCreateCashSession = async (data: CashSessionAttributes) => {
  try {
    const newCashSession = await CashSession.create(data)
    return { success: true, cashSession: newCashSession }
  } catch (error) {
    console.error('Error creating cash session:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al crear la sesión de caja',
    }
  }
}

export default serviceCreateCashSession
