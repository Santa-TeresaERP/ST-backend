import PaymentMethod from '@models/payment_metod'
import { paymentMethodAttributes } from '@type/museo/payment_metod'
import { paymentMethodValidation } from 'src/schemas/museo/payment_metod'

const serviceCreatePaymentMethod = async (body: paymentMethodAttributes) => {
  const validation = paymentMethodValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name } = validation.data

  const newMethod = await PaymentMethod.create({ name })
  return newMethod
}

export default serviceCreatePaymentMethod
