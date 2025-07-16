import useCashSession from '@services/cash_session'
import { Request, Response } from 'express'

const getCashSessionByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useCashSession.serviceGetCashSessionById(id)
    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.json({
      message: 'Sesión de caja obtenida exitosamente',
      cashSession: result.cashSession,
    })
  } catch (error) {
    console.error('Error in getCashSessionByIdController:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default getCashSessionByIdController
