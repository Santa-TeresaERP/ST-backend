import { Op } from 'sequelize'
import GeneralIncome from '../../models/generalIncome'
import GeneralExpense from '../../models/generalExpense'
import Module from '../../models/modules'

// IDs de los módulos relevantes
const VENTAS_MODULE_ID = '6b45ab26-624a-4ee3-8fc5-35f68d3c7756'
const PRODUCCION_MODULE_IDS = [
  'fb32692b-f493-4048-9186-90926c222489',
  '7806a85b-826b-4183-a277-e471344301ee',
]
const INVENTARIO_MODULE_ID = '01ff8ab1-5cb2-473b-8c70-ffa0d3d65c98'

export const getDataDeVentas = async (startDate: string, endDate: string) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    // Normalizar fechas
    const [year, month, day] = startDate.split('-').map(Number)
    const start = new Date(year, month - 1, day, 0, 0, 0, 0)

    const [y2, m2, d2] = endDate.split('-').map(Number)
    const end = new Date(y2, m2 - 1, d2, 23, 59, 59, 999)

    // Filtro por rango de fechas
    const filters = {
      date: {
        [Op.between]: [start, end],
      },
    }

    // 1. Ingresos del módulo Ventas
    const ingresosVentas: any[] = await GeneralIncome.findAll({
      where: { ...filters, module_id: VENTAS_MODULE_ID },
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    // 2. Pérdidas de Producción
    const perdidasProduccion: any[] = await GeneralExpense.findAll({
      where: {
        ...filters,
        module_id: { [Op.in]: PRODUCCION_MODULE_IDS },
        expense_type: 'Pérdidas de Producción',
      },
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    // 3. Gastos de Inventario
    const gastosInventario: any[] = await GeneralExpense.findAll({
      where: { ...filters, module_id: INVENTARIO_MODULE_ID },
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    // 4. Devoluciones de Venta
    const devolucionVentas: any[] = await GeneralExpense.findAll({
      where: {
        ...filters,
        module_id: VENTAS_MODULE_ID,
        expense_type: 'Devoluciones de Venta',
      },
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    return {
      success: true as const,
      message: 'Datos de ventas obtenidos correctamente',
      data: {
        ingresosVentas,
        perdidasProduccion,
        gastosInventario,
        devolucionVentas,
      },
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getDataDeVentas'

    return {
      success: false as const,
      message: `Error en getDataDeVentas: ${message}`,
    }
  }
}
