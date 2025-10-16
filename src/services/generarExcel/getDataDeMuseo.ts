import { Op } from 'sequelize'
import GeneralIncome from '@models/generalIncome'
import Module from '@models/modules'

export const getDataDeMuseo = async (startDate: string, endDate: string) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    const museoModule = await Module.findOne({ where: { name: 'Museo' } })

    if (!museoModule) {
      throw new Error('Módulo "Museo" no encontrado')
    }

    // Normalizar fechas
    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    const filters = {
      date: {
        [Op.between]: [start, end],
      },
      module_id: museoModule.id,
    }

    const gastosMuseo = await GeneralIncome.findAll({
      where: filters,
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    return {
      success: true as const,
      message: 'Datos de gastos del Museo obtenidos correctamente',
      data: gastosMuseo,
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getDataDeMuseo'

    return {
      success: false as const,
      message: `Error en getDataDeMuseo: ${message}`,
    }
  }
}
