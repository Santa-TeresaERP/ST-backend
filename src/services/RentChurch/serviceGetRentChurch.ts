import RentChurch from '@models/rentChurch'
import Church from '@models/church'

const serviceGetRentChurch = async (id: string) => {
  const rent = await RentChurch.findByPk(id, {
    include: [{ model: Church, as: 'church' }],
  })
  if (!rent) {
    return { error: 'La reserva no existe' }
  }
  return rent
}

export default serviceGetRentChurch
