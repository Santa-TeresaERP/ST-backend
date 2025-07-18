import PaymentMethod from '@models/payment_metod'

const serviceGetPaymentMethod = async (id: string) => {
  const method = await PaymentMethod.findByPk(id)

  if (!method) return { error: 'Método de pago no encontrado' }
  return method
}

export default serviceGetPaymentMethod
