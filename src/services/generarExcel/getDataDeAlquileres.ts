import { Op } from 'sequelize'
import GeneralIncome from '@models/generalIncome'
import Module from '@models/modules'

export const getDataDeAlquileres = async (
  startDate: string,
  endDate: string,
) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    // Normalizar fechas
    const [year, month, day] = startDate.split('-').map(Number)
    const start = new Date(year, month - 1, day, 0, 0, 0, 0)

    const [y2, m2, d2] = endDate.split('-').map(Number)
    const end = new Date(y2, m2 - 1, d2, 23, 59, 59, 999)

    const filters = {
      date: {
        [Op.between]: [start, end],
      },
      income_type: 'Alquiler',
    }

    const alquileres = await GeneralIncome.findAll({
      where: filters,
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    return {
      success: true as const,
      message: 'Datos de alquileres obtenidos correctamente',
      data: alquileres,
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getDataDeAlquileres'

    return {
      success: false as const,
      message: `Error en getDataDeAlquileres: ${message}`,
    }
  }
}
