import PaymentMethod from '@models/payment_metod'

const serviceDeletePaymentMethod = async (id: string) => {
  const method = await PaymentMethod.findByPk(id)

  if (!method) return { error: 'Método de pago no encontrado' }

  await method.destroy()
  return { message: 'Método de pago eliminado correctamente' }
}

export default serviceDeletePaymentMethod
