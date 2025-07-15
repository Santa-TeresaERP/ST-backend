import useCashSession from '@services/cash_session'
import { Request, Response } from 'express'

const deleteCashSessionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useCashSession.serviceDeleteCashSession(id)
    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.json({ message: result.message })
  } catch (error) {
    console.error('Error in deleteCashSessionController:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default deleteCashSessionController
