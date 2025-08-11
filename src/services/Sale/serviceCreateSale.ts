import sale from '@models/sale'
import { salesAttributes } from '@type/ventas/sale'
import { saleValidation } from '../../schemas/ventas/salesSchema'

// 👇 Importa la nueva función que creará el ingreso de ventas
import createSalesIncome from '@services/GeneralIncome/CollentionFunc/Sales/salesIncome'

const serviceCreateSale = async (body: salesAttributes) => {
  // Validar datos con el esquema
  const validation = saleValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { income_date, store_id, total_income, observations } = validation.data

  // 1) Crear la venta
  const newSale = await sale.create({
    income_date,
    store_id,
    total_income,
    observations: observations ?? undefined,
  })

  // 2) Registrar el ingreso en general_incomes
  await createSalesIncome(newSale.get({ plain: true }) as salesAttributes)

  return newSale
}

export default serviceCreateSale
