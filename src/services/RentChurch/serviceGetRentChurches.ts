import RentChurch from '@models/rentChurch'
import Place from '@models/places'

const serviceGetRentChurches = async () => {
  const rents = await RentChurch.findAll({
    include: [Place],
  })
  return rents
}

export default serviceGetRentChurches
