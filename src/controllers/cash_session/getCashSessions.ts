import useCashSession from '@services/cash_session'
import { Request, Response } from 'express'

const getCashSessionsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await useCashSession.serviceGetCashSessions()
    if (!result.success) {
      res.status(400).json({ error: result.error })
      return
    }

    res.json({
      message: 'Sesiones de caja obtenidas exitosamente',
      cashSessions: result.cashSessions,
    })
  } catch (error) {
    console.error('Error in getCashSessionsController:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default getCashSessionsController
