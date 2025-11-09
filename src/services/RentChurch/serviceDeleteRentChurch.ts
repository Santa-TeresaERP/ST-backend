import RentChurch from '@models/rentChurch'

const serviceDeleteRentChurch = async (id: string) => {
  const rentRecord = await RentChurch.findByPk(id)
  if (!rentRecord) {
    return { error: 'La reserva no existe' }
  }
  await rentRecord.update({ status: false })
  return { message: 'Reserva desactivada correctamente' }
}

export default serviceDeleteRentChurch
