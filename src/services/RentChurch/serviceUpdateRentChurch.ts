import RentChurch from '@models/rentChurch'
import { RentChurchAttributes } from '@type/alquiler/rentChurch'
import { rentChurchUpdateValidation } from '../../schemas/alquiler/rentChurchSchema'

const serviceUpdateRentChurch = async (
  id: string,
  body: Partial<RentChurchAttributes>,
) => {
  const validation = rentChurchUpdateValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const updateData = validation.data

  const rentRecord = await RentChurch.findByPk(id)
  if (!rentRecord) {
    return { error: 'La reserva no existe' }
  }

  await rentRecord.update(updateData)

  return rentRecord
}

export default serviceUpdateRentChurch
