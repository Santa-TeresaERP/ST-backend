import sale from '@models/sale'
import { salesAttributes } from '@type/ventas/sale'
import { saleValidation } from 'src/schemas/ventas/salesSchema'

const serviceUpdateSale = async (id: string, body: salesAttributes) => {
  // Validar los datos del cuerpo usando el esquema de validación
  const validation = saleValidation(body)

  if (!validation.success) {
    // Retornar errores de validación si los datos no son válidos
    return { error: validation.error.errors }
  }

  const { income_date, store_id, total_income, observations } = validation.data

  // Buscar la venta por su ID
  const saleRecord = await sale.findByPk(id)
  if (!saleRecord) {
    // Retornar un error si la venta no existe
    return { error: 'La venta no existe' }
  }

  // Actualizar la venta con los nuevos datos
  await saleRecord.update({
    income_date,
    store_id,
    total_income,
    observations: observations ?? undefined,
  })
  return saleRecord
}

export default serviceUpdateSale
