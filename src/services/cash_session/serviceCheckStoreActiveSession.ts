import CashSession from '@models/cashSession'
import Store from '@models/store'

/**
 * Servicio para verificar si una tienda tiene una sesión de caja activa
 * @param storeId - ID de la tienda a verificar
 * @returns Información sobre el estado de la sesión de caja de la tienda
 */
const serviceCheckStoreActiveSession = async (storeId: string) => {
  try {
    // Verificar si la tienda existe
    const store = await Store.findByPk(storeId)
    if (!store) {
      return {
        success: false,
        error: 'Tienda no encontrada',
      }
    }

    // Buscar una sesión activa para la tienda
    const activeCashSession = await CashSession.findOne({
      where: {
        store_id: storeId,
        status: 'open',
      },
      order: [['started_at', 'DESC']], // Obtener la más reciente
    })

    if (activeCashSession) {
      return {
        success: true,
        isActive: true,
        message: 'La tienda tiene una sesión de caja activa',
        store: {
          id: store.id,
          store_name: store.store_name,
          address: store.address,
        },
        activeSession: {
          id: activeCashSession.id,
          user_id: activeCashSession.user_id,
          start_amount: activeCashSession.start_amount,
          started_at: activeCashSession.started_at,
          status: activeCashSession.status,
        },
      }
    } else {
      // Buscar la última sesión cerrada para información adicional
      const lastClosedSession = await CashSession.findOne({
        where: {
          store_id: storeId,
          status: 'closed',
        },
        order: [['ended_at', 'DESC']],
      })

      return {
        success: true,
        isActive: false,
        message: 'La tienda no tiene una sesión de caja activa',
        store: {
          id: store.id,
          store_name: store.store_name,
          address: store.address,
        },
        lastClosedSession: lastClosedSession
          ? {
              id: lastClosedSession.id,
              end_amount: lastClosedSession.end_amount,
              ended_at: lastClosedSession.ended_at,
              total_sales: lastClosedSession.total_sales,
              total_returns: lastClosedSession.total_returns,
            }
          : null,
      }
    }
  } catch (error) {
    console.error('Error checking store active session:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al verificar el estado de la sesión de caja de la tienda',
    }
  }
}

export default serviceCheckStoreActiveSession
