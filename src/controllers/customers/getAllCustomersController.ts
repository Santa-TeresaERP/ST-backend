import { Request, Response } from 'express'
import useCustomers from '@services/customers/index'
import { HttpError } from '@errors/http'

class GetAllCustomersController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const result = await useCustomers.getAllCustomers()
      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.message,
          error: result.error,
        })
        return
      }
      res.status(200).json(result)
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    }
  }
}

export default GetAllCustomersController
