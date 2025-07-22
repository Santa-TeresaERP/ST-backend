import PaymentMethod from '@models/payment_metod'
import { paymentMethodAttributes } from '@type/museo/payment_metod'
import { paymentMethodValidation } from 'src/schemas/museo/payment_metod'

const serviceUpdatePaymentMethod = async (
  id: string,
  body: paymentMethodAttributes,
) => {
  const validation = paymentMethodValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const method = await PaymentMethod.findByPk(id)
  if (!method) return { error: 'Método de pago no encontrado' }

  await method.update(validation.data)
  return method
}

export default serviceUpdatePaymentMethod
