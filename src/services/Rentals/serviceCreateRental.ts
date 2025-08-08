import Rental from '@models/rental'
import { RentalAttributes } from '@type/alquiler/rentals'
import { rentalValidation } from '../../schemas/alquiler/rentalsSchema'

// ✅ Importa el income correcto de Alquileres
import createRentalIncome from '@services/GeneralIncome/CollentionFunc/Alquileres/AlquilresIncome'

const serviceCreateRental = async (body: RentalAttributes) => {
  const validation = rentalValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { customer_id, place_id, user_id, start_date, end_date, amount } =
    validation.data

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
