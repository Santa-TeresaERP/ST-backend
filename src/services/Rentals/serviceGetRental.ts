import Rental from '@models/rental'
import Customer from '@models/customers'
import Place from '@models/places'
import User from '@models/user'

const serviceGetRental = async (id: string) => {
  const rentalRecord = await Rental.findByPk(id, {
    include: [Customer, Place, User],
  })
  if (!rentalRecord) {
    return { error: 'El alquiler no existe' }
  }
  return rentalRecord
}

export default serviceGetRental
