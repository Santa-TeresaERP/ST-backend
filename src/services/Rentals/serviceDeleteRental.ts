import Rental from '@models/rental'

const serviceDeleteRental = async (id: string) => {
  const rentalRecord = await Rental.findByPk(id)
  if (!rentalRecord) {
    return { error: 'El alquiler no existe' }
  }
  await rentalRecord.destroy()
  return { message: 'Alquiler eliminado correctamente' }
}

export default serviceDeleteRental
