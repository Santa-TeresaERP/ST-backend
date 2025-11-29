import RentChurch from '@models/rentChurch'
import Church from '@models/church'
import { RentChurchAttributes } from '@type/alquiler/rentChurch'
import { rentChurchValidation } from '../../schemas/alquiler/rentChurchSchema'
import { Op } from 'sequelize'
import createRentGeneralIncome from './createRentGeneralIncome'

const DEFAULT_CHURCH_NAME = 'Iglesia Monasterio'

const serviceCreateRentChurch = async (body: RentChurchAttributes) => {
  // Siempre resolvemos el ID real de la iglesia "Iglesia Monasterio" para evitar valores desactualizados.
  const defaultChurch = await Church.findOne({
    where: { name: DEFAULT_CHURCH_NAME, status: true },
  })

  if (!defaultChurch) {
    return {
      error: `No se encontró la iglesia por defecto "${DEFAULT_CHURCH_NAME}".`,
    }
  }

  const bodyWithDefaultChurch: RentChurchAttributes = {
    ...body,
    idChurch: defaultChurch.id,
  }

  const validation = rentChurchValidation(bodyWithDefaultChurch)
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

  try {
    await createRentGeneralIncome({
      name,
      type,
      startTime,
      endTime,
      price,
      date,
      idChurch,
      status: true,
    })
  } catch (error) {
    console.error('Error creando el ingreso general para la reserva:', error)
  }

  return newRent
}

export default serviceCreateRentChurch
