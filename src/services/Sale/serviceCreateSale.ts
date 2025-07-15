import sale from '@models/sale'
import { salesAttributes } from '@type/ventas/sale'
import { saleValidation } from 'src/schemas/ventas/salesSchema'

const serviceCreateSale = async (body: salesAttributes) => {
  // Validar los datos del cuerpo usando el esquema de validación
  const validation = saleValidation(body)

  if (!validation.success) {
    // Retornar errores de validación si los datos no son válidos
    return { error: validation.error.errors }
  }

  const { income_date, store_id, total_income, observations } = validation.data

  // Crear un nuevo registro de venta
  const newSale = await sale.create({
    income_date,
    store_id,
    total_income,
    observations: observations ?? undefined,
  })
  return newSale
}

export default serviceCreateSale
