import CashSession from '@models/cashSession'
import { CashSessionAttributes } from '@type/ventas/cashSession'

const serviceUpdateCashSession = async (
  id: string,
  data: Partial<CashSessionAttributes>,
) => {
  try {
    const cashSession = await CashSession.findByPk(id)

    if (!cashSession) {
      return { success: false, error: 'Sesión de caja no encontrada' }
    }

    await cashSession.update(data)
    await cashSession.reload()

    return { success: true, cashSession }
  } catch (error) {
    console.error('Error updating cash session:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al actualizar la sesión de caja',
    }
  }
}

export default serviceUpdateCashSession
