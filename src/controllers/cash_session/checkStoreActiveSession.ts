import useCashSession from '@services/cash_session'
import { Request, Response } from 'express'

/**
 * Controlador para verificar si una tienda tiene una sesión de caja activa
 */
const checkStoreActiveSessionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { storeId } = req.params

    // Validar que se proporcione el ID de la tienda
    if (!storeId) {
      res.status(400).json({
        error: 'El ID de la tienda es requerido',
      })
      return
    }

    const result = await useCashSession.serviceCheckStoreActiveSession(storeId)

    if (!result.success) {
      const statusCode = result.error === 'Tienda no encontrada' ? 404 : 400
      res.status(statusCode).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error in checkStoreActiveSessionController:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default checkStoreActiveSessionController
