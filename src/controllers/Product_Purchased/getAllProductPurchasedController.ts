import { Request, Response } from 'express'
import productPurchasedService from '@services/almacen/productPurchased'
import { HttpError } from '@errors/http'

class GetAllProductPurchasedController {
  // Método para la UI (solo activos)
  static async get(req: Request, res: Response): Promise<void> {
    try {
      const result = await productPurchasedService.get()
      res.status(200).json({
        success: true,
        data: result,
      })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    }
  }

  // Método para desarrollador (todos)
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await productPurchasedService.getAll()
      res.status(200).json({
        success: true,
        data: result,
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

export default GetAllProductPurchasedController
