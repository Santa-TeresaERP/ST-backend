import { Request, Response, RequestHandler } from 'express'
import useInventoryAdjustment from '@services/useInventoryAdjustment'

class inventoryAdjustmentController {
  static createAdjustment: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const adjustment = await useInventoryAdjustment.createAdjustment(req.body)
      if ('error' in adjustment) {
        res.status(400).json({ error: adjustment.error })
        return
      }

      res.status(201).json({
        message: 'Ajuste de inventario creado exitosamente',
        adjustment,
      })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static getAdjustments: RequestHandler = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const adjustments = await useInventoryAdjustment.getAdjustments()
      if ('error' in adjustments) {
        res.status(400).json({ error: adjustments.error })
        return
      }

      res.json(adjustments)
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static updateAdjustment: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const adjustment = await useInventoryAdjustment.updateAdjustment(
        req.params.id,
        req.body,
      )
      if ('error' in adjustment) {
        res.status(400).json({ error: adjustment.error })
        return
      }

      res.json({
        message: 'Ajuste de inventario actualizado',
        adjustment,
      })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static deleteAdjustment: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const result = await useInventoryAdjustment.deleteAdjustment(
        req.params.id,
      )
      if ('error' in result) {
        res.status(400).json({ error: result.error })
        return
      }

      res.json({ message: result.message })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

export default inventoryAdjustmentController
