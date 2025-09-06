import Rental from '@models/rental'
import { RentalAttributes } from '@type/alquiler/rentals'
import { rentalValidation } from '../../schemas/alquiler/rentalsSchema'

const serviceUpdateRental = async (id: string, body: RentalAttributes) => {
  const validation = rentalValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const {
    customer_id,
    place_id,
    user_id,
    start_date,
    end_date,
    amount,
    status,
  } = validation.data
  const rentalRecord = await Rental.findByPk(id)
  if (!rentalRecord) {
    return { error: 'El alquiler no existe' }
  }
  await rentalRecord.update({
    customer_id,
    place_id,
    user_id,
    start_date,
    end_date,
    amount,
    status,
  })
  return rentalRecord
}

export default serviceUpdateRental
