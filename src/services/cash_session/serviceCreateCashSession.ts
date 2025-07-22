import CashSession from '@models/cashSession'

const serviceCreateCashSession = async (
  data: Partial<CashSession>,
  userId: string,
) => {
  try {
    // Verificar si ya existe una sesión abierta para la tienda
    const existingOpenSession = await CashSession.findOne({
      where: {
        store_id: data.store_id,
        status: 'open',
      },
    })

    if (existingOpenSession) {
      return {
        success: false,
        error: 'Ya existe una sesión abierta para esta tienda',
      }
    }

    // Buscar la última sesión cerrada para esta tienda
    const lastClosedSession = await CashSession.findOne({
      where: {
        store_id: data.store_id,
        status: 'closed',
      },
      order: [['ended_at', 'DESC']],
    })

    // Si hay una sesión anterior, usar su end_amount como start_amount
    const start_amount = lastClosedSession?.end_amount ?? data.start_amount ?? 0

    // Crear la nueva sesión
    if (!data.store_id) {
      return {
        success: false,
        error: 'store_id es requerido para crear una sesión de caja',
      }
    }
    const newSession = await CashSession.create({
      ...data,
      store_id: data.store_id, // ensure store_id is present and not undefined
      user_id: userId,
      start_amount,
      started_at: new Date(),
      status: 'open',
    })

    return { success: true, cashSession: newSession }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export default serviceCreateCashSession
