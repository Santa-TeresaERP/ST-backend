import RentChurch from '@models/rentChurch'
import { RentChurchAttributes } from '@type/alquiler/rentChurch'
import { rentChurchValidation } from '../../schemas/alquiler/rentChurchSchema'
import { Op } from 'sequelize'

const serviceCreateRentChurch = async (body: RentChurchAttributes) => {
  const validation = rentChurchValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, type, startTime, endTime, price, date, idChurch } =
    validation.data
  if (startTime >= endTime) {
    return {
      error: 'La hora de inicio debe ser menor que la hora de fin.',
    }
  }
  if (idChurch) {
    const overlapping = await RentChurch.findOne({
      where: {
        idChurch,
        status: true,
        date,
        [Op.or]: [
          {
            startTime: { [Op.lte]: startTime },
            endTime: { [Op.gt]: startTime },
          },
          {
            startTime: { [Op.lt]: endTime },
            endTime: { [Op.gte]: endTime },
          },
          {
            startTime: { [Op.gte]: startTime },
            endTime: { [Op.lte]: endTime },
          },
        ],
      },
    })

    if (overlapping) {
      return {
        error:
          'No se puede crear la reserva: ya existe una reserva activa para esta iglesia en el rango horario indicado.',
      }
    }
  }

  const newRent = await RentChurch.create({
    name,
    type,
    startTime,
    endTime,
    price,
    status: true,
    date,
    idChurch,
  })

  return newRent
}

export default serviceCreateRentChurch
