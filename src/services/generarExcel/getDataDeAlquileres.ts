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
    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999) // 👈 incluir todo el día

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
