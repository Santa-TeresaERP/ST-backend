import CashSession from '@models/cashSession'
import Sale from '@models/sale'
import Return from '@models/returns' // Cambiamos de Lost a Return
import Product from '@models/product'
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
      // Obtenemos todas las devoluciones para la tienda en el período
      const returns = await Return.findAll({
        where: {
          createdAt: {
            [Op.gte]: session.started_at,
            [Op.lte]: data.ended_at || new Date(),
          },
        },
        include: [
          {
            model: Sale,
            as: 'sale',
            where: {
              store_id: session.store_id,
            },
            required: true,
          },
          {
            model: Product,
            as: 'product',
            required: true,
          },
        ],
      })

      // Calculamos el valor monetario de las devoluciones
      let perdidas = 0
      for (const returnItem of returns) {
        try {
          const product = await Product.findByPk(returnItem.productId)
          if (product && product.price) {
            perdidas += Number(product.price)
          }
        } catch (error) {
          console.error('Error al obtener producto de devolución:', error)
        }
      }

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
