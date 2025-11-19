import { Op } from 'sequelize'
import GeneralIncome from '@models/generalIncome'
import Module from '@models/modules'

export const getDataDeIglesia = async (startDate: string, endDate: string) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    // 1. Buscar el ID del módulo "Iglesia" para filtrar correctamente
    const churchModule = await Module.findOne({ where: { name: 'Iglesia' } })

    if (!churchModule) {
      throw new Error('El módulo "Iglesia" no existe en la base de datos.')
    }

    // 2. Normalizar fechas (inicio del día 1 vs final del día 2)
    const [year, month, day] = startDate.split('-').map(Number)
    const start = new Date(year, month - 1, day, 0, 0, 0, 0)

    const [y2, m2, d2] = endDate.split('-').map(Number)
    const end = new Date(y2, m2 - 1, d2, 23, 59, 59, 999)

    // 3. Configurar filtros
    const filters = {
      date: {
        [Op.between]: [start, end],
      },
      module_id: churchModule.id, // 👈 Filtramos por el ID del módulo Iglesia
    }

    // 4. Consultar
    const ingresosIglesia = await GeneralIncome.findAll({
      where: filters,
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    return {
      success: true as const,
      message: 'Datos de ingresos de Iglesia obtenidos correctamente',
      data: ingresosIglesia,
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getDataDeIglesia'

    return {
      success: false as const,
      message: `Error en getDataDeIglesia: ${message}`,
    }
  }
}
