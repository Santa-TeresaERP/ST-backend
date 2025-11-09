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

  // Evitar solapamientos para la misma iglesia y fecha (suponiendo formato HH:mm)
  const overlapping = await RentChurch.findOne({
    where: {
      idChurch,
      status: true,
      date,
      startTime: { [Op.lte]: endTime },
      endTime: { [Op.gte]: startTime },
    },
  })

  if (overlapping) {
    return {
      error:
        'No se puede crear la reserva: ya existe una reserva activa para esta iglesia en el rango horario indicado.',
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
