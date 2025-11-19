import RentChurch from '@models/rentChurch'
import { RentChurchAttributes } from '@type/alquiler/rentChurch'
import { rentChurchValidation } from '../../schemas/alquiler/rentChurchSchema'

const serviceUpdateRentChurch = async (
  id: string,
  body: RentChurchAttributes,
) => {
  const validation = rentChurchValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, type, startTime, endTime, price, status, date, idChurch } =
    validation.data

  const rentRecord = await RentChurch.findByPk(id)
  if (!rentRecord) {
    return { error: 'La reserva no existe' }
  }

  await rentRecord.update({
    name,
    type,
    startTime,
    endTime,
    price,
    status,
    date,
    idChurch,
  })

  return rentRecord
}

export default serviceUpdateRentChurch
