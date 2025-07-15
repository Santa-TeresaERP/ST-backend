import useCashSession from '@services/cash_session'
import { Request, Response } from 'express'

const updateCashSessionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useCashSession.serviceUpdateCashSession(id, req.body)
    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.json({
      message: 'Sesión de caja actualizada exitosamente',
      cashSession: result.cashSession,
    })
  } catch (error) {
    console.error('Error in updateCashSessionController:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default updateCashSessionController
