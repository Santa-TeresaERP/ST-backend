import { Request, Response } from 'express'
import usePaymentMethod from '@services/paymentMethod'

const deletePaymentMethodController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await usePaymentMethod.serviceDeletePaymentMethod(id)

    if ('error' in result) {
      res.status(404).json(result)
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error deleting payment method:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default deletePaymentMethodController
