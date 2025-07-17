import useCashSession from '@services/cash_session'
import { Request, Response } from 'express'

const createCashSessionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await useCashSession.serviceCreateCashSession(req.body)
    if (!result.success) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(201).json({
      message: 'Sesión de caja creada exitosamente',
      cashSession: result.cashSession,
    })
  } catch (error) {
    console.error('Error in createCashSessionController:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default createCashSessionController
