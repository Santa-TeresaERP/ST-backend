import { Request, Response } from 'express'
import usePaymentMethod from '@services/paymentMethod'

const createPaymentMethodController = async (req: Request, res: Response) => {
  try {
    const result = await usePaymentMethod.serviceCreatePaymentMethod(req.body)

    if ('error' in result) {
      res.status(400).json(result)
    }

    res.status(201).json(result)
  } catch (error) {
    console.error('Error creating payment method:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default createPaymentMethodController
