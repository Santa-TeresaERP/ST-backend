import { Request, Response } from 'express'
import productPurchasedService from '@services/Product_Purchased/productPurchasedService'
import { HttpError } from '@errors/http'

class DeleteProductPurchasedController {
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const result = await productPurchasedService.delete(id)

      if (result.error) {
        res.status(404).json({
          success: false,
          message: result.error,
        })
        return
      }

      res.status(200).json({
        success: true,
        message: result.data.message,
      })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    }
  }
}

export default DeleteProductPurchasedController
