import { Request, Response } from 'express'
import useIncomeChurch from '@services/IncomeChurch'

const { serviceDeleteIncomeChurch } = useIncomeChurch

const deleteIncomeChurch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { churchId } = req.params

    if (!churchId) {
      res.status(400).json({ error: 'El ID de la iglesia es requerido' })
      return
    }

    const result = await serviceDeleteIncomeChurch(churchId)

    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json({
      message: result.message,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error('Error en deleteIncomeChurch.controller:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default deleteIncomeChurch
