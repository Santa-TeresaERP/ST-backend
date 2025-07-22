import { Request, Response } from 'express'
import usePaymentMethod from '@services/paymentMethod'

const getPaymentMethodController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await usePaymentMethod.serviceGetPaymentMethod(id)

    if ('error' in result) {
      res.status(404).json(result)
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error getting payment method:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default getPaymentMethodController
