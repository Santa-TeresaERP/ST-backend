import Rental from '@models/rental'
import { RentalAttributes } from '@type/alquiler/rentals'
import { rentalValidation } from '../../schemas/alquiler/rentalsSchema'
import { Op } from 'sequelize'

// ✅ Importa el income correcto de Alquileres
import createRentalIncome from '@services/GeneralIncome/CollentionFunc/Alquileres/AlquilresIncome'

const serviceCreateRental = async (body: RentalAttributes) => {
  const validation = rentalValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { customer_id, place_id, user_id, start_date, end_date, amount } =
    validation.data

  // Evitar crear si existe un alquiler ACTIVO que se solape para el mismo lugar
  const activeOverlap = await Rental.findOne({
    where: {
      place_id,
      status: true,
      start_date: { [Op.lte]: end_date }, // existente inicia antes o cuando termina el nuevo
      end_date: { [Op.gte]: start_date }, // existente termina después o cuando inicia el nuevo
    },
  })

  if (activeOverlap) {
    return {
      error:
        'No se puede crear el alquiler: ya existe un alquiler activo para este lugar en el período indicado.',
    }
  }

  // 1) Crear el alquiler
  const newRental = await Rental.create({
    customer_id,
    place_id,
    user_id,
    start_date,
    end_date,
    amount,
  })

  // 2) Registrar el ingreso contable por alquiler (no romper si falla)
  try {
    await createRentalIncome(newRental.id)
  } catch (e) {
    console.error('⚠️ No se pudo registrar el ingreso por alquiler:', e)
  }

  return newRental
}

export default serviceCreateRental
