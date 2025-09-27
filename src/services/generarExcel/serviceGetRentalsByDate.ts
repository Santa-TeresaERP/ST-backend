import { Op } from 'sequelize'
import Rental from '@models/rental'
import Customer from '@models/customers'
import Place from '@models/places'
import User from '@models/user'

export const serviceGetRentalsByDate = async (
  startDate: string,
  endDate: string,
) => {
  try {
    const rentals = await Rental.findAll({
      where: {
        start_date: {
          [Op.gte]: new Date(startDate),
        },
        end_date: {
          [Op.lte]: new Date(endDate),
        },
      },
      include: [
        {
          model: Customer,
          attributes: ['full_name'], // solo nombre del cliente
        },
        {
          model: Place,
          attributes: ['name'], // solo nombre del lugar
        },
        {
          model: User,
          attributes: ['name'], // solo nombre del usuario
        },
      ],
      attributes: ['amount'], // solo amount de rental
    })

    // Formatear respuesta
    const result = rentals.map((rental: any) => ({
      customer_name: rental.Customer?.full_name,
      place_name: rental.Place?.name,
      user_name: rental.User?.name,
      amount: rental.amount,
    }))

    return {
      success: true,
      data: result,
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error en serviceGetRentalsByDate: ${error.message}`,
    }
  }
}
