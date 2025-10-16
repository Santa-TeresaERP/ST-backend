import { Op } from 'sequelize'
import GeneralExpense from '@models/generalExpense'
import Module from '@models/modules'

export const getDataDeMonasterio = async (
  startDate: string,
  endDate: string,
) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    const monasterioModule = await Module.findOne({
      where: { name: 'Monasterio' },
    })

    if (!monasterioModule) {
      throw new Error('Módulo "Monasterio" no encontrado')
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
      module_id: monasterioModule.id,
    }

    const gastosMonasterio = await GeneralExpense.findAll({
      where: filters,
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    return {
      success: true as const,
      message: 'Datos de gastos del Monasterio obtenidos correctamente',
      data: gastosMonasterio,
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getDataDeMonasterio'

    return {
      success: false as const,
      message: `Error en getDataDeMonasterio: ${message}`,
    }
  }
}
