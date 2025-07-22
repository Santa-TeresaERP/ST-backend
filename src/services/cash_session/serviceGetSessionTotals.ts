import sale from '@models/sale'
import Return from '@models/returns'
import CashSession from '@models/cashSession'
import { Op } from 'sequelize'
import Product from '@models/product'

/**
 * Obtiene el total de ventas y devoluciones para una sesión de caja específica
 */
const getSessionTotals = async (sessionId: string) => {
  try {
    // Primero obtenemos la sesión para saber el rango de fechas
    const session = await CashSession.findByPk(sessionId)

    if (!session) {
      return {
        error: 'Sesión de caja no encontrada',
      }
    }

    // Calcular el total de ventas en el período
    const salesInPeriod = await sale.findAll({
      where: {
        store_id: session.store_id,
        createdAt: {
          [Op.between]: [session.started_at, session.ended_at || new Date()],
        },
      },
    })

    let totalSales = 0
    salesInPeriod.forEach((s) => {
      totalSales += Number(s.total_income)
    })

    // Calcular el total de devoluciones en el período
    // Primero obtenemos los IDs de las ventas en el período
    const saleIds = salesInPeriod
      .map((s) => s.id)
      .filter((id): id is string => id !== undefined)

    // Luego buscamos todas las devoluciones asociadas a esas ventas
    const returnsInPeriod = await Return.findAll({
      where: {
        salesId: {
          [Op.in]: saleIds,
        },
        createdAt: {
          [Op.between]: [session.started_at, session.ended_at || new Date()],
        },
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
      ],
    })

    // Calculamos el total de devoluciones (usando el precio del producto)
    let totalReturns = 0
    for (const returnItem of returnsInPeriod) {
      try {
        // Verificamos si podemos obtener el producto a través de la relación
        const product = await Product.findByPk(returnItem.productId)
        if (product && product.price) {
          totalReturns += Number(product.price)
        }
      } catch (error) {
        console.error('Error al obtener producto de devolución:', error)
      }
    }

    // Calcular el monto final
    const finalAmount = Number(session.start_amount) + totalSales - totalReturns

    return {
      sessionId: session.id,
      storeId: session.store_id,
      startDate: session.started_at,
      endDate: session.ended_at,
      initialMoney: session.start_amount,
      totalSales,
      totalReturns,
      finalAmount,
      salesCount: salesInPeriod.length,
      returnsCount: returnsInPeriod.length,
    }
  } catch (error) {
    console.error('Error al calcular totales de sesión:', error)
    return {
      error: 'Error al calcular totales de sesión',
    }
  }
}

export default getSessionTotals
