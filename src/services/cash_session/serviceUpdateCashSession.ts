import CashSession from '@models/cashSession'
import Sale from '@models/sale'
import Return from '@models/returns' // Cambiamos de Lost a Return
import { Op } from 'sequelize'

const serviceUpdateCashSession = async (
  id: string,
  data: Partial<CashSession>,
) => {
  try {
    const session = await CashSession.findByPk(id)
    if (!session) return { success: false, error: 'Sesión no encontrada' }

    if (data.status === 'closed' && session.status === 'open') {
      // Calcular ventas en el rango de la sesión
      // Usamos createdAt en lugar de income_date ya que income_date es un string
      const ventas =
        (await Sale.sum('total_income', {
          where: {
            store_id: session.store_id,
            createdAt: {
              [Op.gte]: session.started_at,
              [Op.lte]: data.ended_at || new Date(),
            },
          },
        })) || 0

      // Calcular devoluciones/pérdidas en el rango de la sesión
      // Buscamos devoluciones directamente por storeId y rango de fechas
      const returns = await Return.findAll({
        where: {
          storeId: session.store_id, // Usar storeId en lugar de join
          createdAt: {
            [Op.gte]: session.started_at,
            [Op.lte]: data.ended_at || new Date(),
          },
        },
      })

      // Calculamos el valor monetario de las devoluciones usando el campo price
      const perdidas = returns.reduce((total, returnItem) => {
        return total + Number(returnItem.price || 0)
      }, 0)

      const end_amount =
        Number(session.start_amount) + Number(ventas) - Number(perdidas)

      await session.update({
        ...data,
        end_amount,
        total_sales: ventas,
        total_returns: perdidas,
        ended_at: data.ended_at || new Date(),
        status: 'closed',
      })
    } else {
      await session.update(data)
    }

    return { success: true, cashSession: session }
  } catch (error) {
    console.error('Error en serviceUpdateCashSession:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

export default serviceUpdateCashSession
