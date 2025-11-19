import RentChurch from '@models/rentChurch'
import Church from '@models/church'

const serviceGetRentChurches = async () => {
  const rents = await RentChurch.findAll({
    include: [{ model: Church, as: 'church' }],
  })
  return rents
}

export default serviceGetRentChurches
