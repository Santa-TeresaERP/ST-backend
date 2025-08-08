import CashSession from '@models/cashSession'

// Función para eliminar todas las sesiones de caja de una tienda específica
const serviceDeleteCashSession = async (storeId: string) => {
  try {
    // Buscar todas las sesiones de caja de la tienda especificada
    const cashSessions = await CashSession.findAll({
      where: { store_id: storeId },
    })

    if (!cashSessions || cashSessions.length === 0) {
      return {
        success: false,
        error: 'No se encontraron sesiones de caja para esta tienda',
      }
    }

    // Eliminar todas las sesiones de caja encontradas
    const deletedCount = await CashSession.destroy({
      where: { store_id: storeId },
    })

    return {
      success: true,
      message: `${deletedCount} sesión(es) de caja eliminada(s) exitosamente para la tienda`,
      deletedCount,
    }
  } catch (error) {
    console.error('Error deleting cash sessions by store:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al eliminar las sesiones de caja de la tienda',
    }
  }
}

export default serviceDeleteCashSession
