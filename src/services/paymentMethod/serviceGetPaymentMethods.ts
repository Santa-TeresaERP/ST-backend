import PaymentMethod from '@models/payment_metod'

const serviceGetPaymentMethods = async () => {
  const methods = await PaymentMethod.findAll({
    order: [['createdAt', 'DESC']],
  })
  return methods
}

export default serviceGetPaymentMethods
