import { Request, Response } from 'express'
import useIncomeChurch from '@services/church'

const { serviceUpdateIncomeChurch } = useIncomeChurch

const updateIncomeChurch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: 'El ID del ingreso es requerido' })
      return
    }

    const result = await serviceUpdateIncomeChurch(id, req.body)

    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json({
      message: 'Ingreso de la iglesia actualizado exitosamente',
      income: result.income,
    })
  } catch (error) {
    console.error('Error en updateIncomeChurch.controller:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default updateIncomeChurch
