import Rental from '@models/rental'
import { RentalAttributes } from '@type/alquiler/rentals'
import { rentalValidation } from '../../schemas/alquiler/rentalsSchema'

const serviceCreateRental = async (body: RentalAttributes) => {
  const validation = rentalValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const { customer_id, place_id, user_id, start_date, end_date, amount } =
    validation.data
  const newRental = await Rental.create({
    customer_id,
    place_id,
    user_id,
    start_date,
    end_date,
    amount,
  })
  return newRental
}

export default serviceCreateRental
