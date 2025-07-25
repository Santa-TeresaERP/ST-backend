import Rental from '@models/rental'
import Customer from '@models/customers'
import Place from '@models/places'
import User from '@models/user'

const serviceGetRentals = async () => {
  const rentals = await Rental.findAll({
    include: [Customer, Place, User],
  })
  return rentals
}

export default serviceGetRentals
