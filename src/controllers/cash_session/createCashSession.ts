import useCashSession from '@services/cash_session'
import { Response } from 'express'
import { AuthRequest } from '@type/user/auth'

const createCashSessionController = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    // Obtenemos el ID del usuario del objeto req.authUser
    const userId = req.authUser?.userId

    if (!userId) {
      res.status(401).json({ error: 'Usuario no autenticado' })
      return
    }

    const result = await useCashSession.serviceCreateCashSession(
      req.body,
      userId,
    )
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
