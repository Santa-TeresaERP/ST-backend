import { Request, Response } from 'express'
import { HttpError } from '@errors/http'
import productPurchasedService from '@services/Product_Purchased'

class UpdateProductPurchasedController {
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const result = await productPurchasedService.update(id, req.body)

      if (result.error) {
        // Puede ser 400 por validación o 404 por no encontrarlo
        res.status(404).json({
          success: false,
          message: result.error,
        })
        return
      }

      res.status(200).json({
        success: true,
        message: 'Producto comprado actualizado exitosamente.',
        data: result.data,
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

export default UpdateProductPurchasedController
