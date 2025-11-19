import RentChurch from '@models/rentChurch'
import Place from '@models/places'

const serviceGetRentChurch = async (id: string) => {
  const rent = await RentChurch.findByPk(id, { include: [Place] })
  if (!rent) {
    return { error: 'La reserva no existe' }
  }
  return rent
}

export default serviceGetRentChurch
