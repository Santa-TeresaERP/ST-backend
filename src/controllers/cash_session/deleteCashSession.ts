import useCashSession from '@services/cash_session'
import { Request, Response } from 'express'

const deleteCashSessionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { storeId } = req.params

    if (!storeId) {
      res.status(400).json({ error: 'El ID de la tienda es requerido' })
      return
    }

    const result = await useCashSession.serviceDeleteCashSession(storeId)
    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.json({
      message: result.message,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error('Error in deleteCashSessionController:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default deleteCashSessionController
