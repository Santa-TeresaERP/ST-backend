import { Request, Response } from 'express'
import { HttpError } from '@errors/http'
import productPurchasedService from '@services/Product_Purchased'

class CreateProductPurchasedController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const result = await productPurchasedService.create(req.body)

      if (result.error) {
        res.status(400).json({
          success: false,
          message: 'Error en la validación de datos.',
          error: result.error,
        })
        return
      }

      res.status(201).json({
        success: true,
        message: 'Producto comprado creado exitosamente.',
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

export default CreateProductPurchasedController
