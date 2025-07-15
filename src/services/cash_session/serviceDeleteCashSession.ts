import CashSession from '@models/cashSession'

const serviceDeleteCashSession = async (id: string) => {
  try {
    const cashSession = await CashSession.findByPk(id)

    if (!cashSession) {
      return { success: false, error: 'Sesión de caja no encontrada' }
    }

    await cashSession.destroy()

    return { success: true, message: 'Sesión de caja eliminada exitosamente' }
  } catch (error) {
    console.error('Error deleting cash session:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al eliminar la sesión de caja',
    }
  }
}

export default serviceDeleteCashSession
