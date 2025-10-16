import { Op } from 'sequelize'
import GeneralIncome from '../../models/generalIncome'
import GeneralExpense from '../../models/generalExpense'
import Module from '../../models/modules'

export const getDataDeVentas = async (startDate: string, endDate: string) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    // 1. Obtener los IDs de los módulos dinámicamente
    const ventasModule = await Module.findOne({ where: { name: 'Ventas' } })
    const produccionModule = await Module.findOne({
      where: { name: 'Produccion' },
    })
    const inventarioModule = await Module.findOne({
      where: { name: 'inventario' },
    })

    // Validar que todos los módulos necesarios existen
    if (!ventasModule || !produccionModule || !inventarioModule) {
      throw new Error(
        'Uno o más módulos necesarios (Ventas, Produccion, inventario) no se encontraron',
      )
    }

    const ventasModuleId = ventasModule.id
    const produccionModuleId = produccionModule.id
    const inventarioModuleId = inventarioModule.id

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

    // 2. Ingresos del módulo Ventas
    const ingresosVentas: any[] = await GeneralIncome.findAll({
      where: { ...filters, module_id: ventasModuleId },
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    // 3. Pérdidas de Producción
    const perdidasProduccion: any[] = await GeneralExpense.findAll({
      where: {
        ...filters,
        module_id: produccionModuleId,
        expense_type: 'Pérdidas de Producción',
      },
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    // 4. Gastos de Inventario
    const gastosInventario: any[] = await GeneralExpense.findAll({
      where: { ...filters, module_id: inventarioModuleId },
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    // 5. Devoluciones de Venta
    const devolucionVentas: any[] = await GeneralExpense.findAll({
      where: {
        ...filters,
        module_id: ventasModuleId,
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
