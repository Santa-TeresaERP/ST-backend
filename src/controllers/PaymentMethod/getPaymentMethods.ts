import { Request, Response } from 'express'
import usePaymentMethod from '@services/paymentMethod'

const getPaymentMethodsController = async (_req: Request, res: Response) => {
  try {
    const result = await usePaymentMethod.serviceGetPaymentMethods()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error getting payment methods:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default getPaymentMethodsController
