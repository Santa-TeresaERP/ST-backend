import { Request, Response } from 'express'
import useIncomeChurch from '@services/IncomeChurch'

const { serviceCreateIncomeChurch } = useIncomeChurch

const createIncomeChurch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = req.body
    const contextChurchId = data.idChurch

    if (!contextChurchId) {
      res.status(400).json({ error: 'El campo idChurch es obligatorio' })
      return
    }

    const result = await serviceCreateIncomeChurch(data, contextChurchId)

    if (!result.success) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(201).json({
      message: 'Ingreso de la iglesia creado exitosamente',
      income: result.income,
    })
  } catch (error) {
    console.error('Error en createIncomeChurch.controller:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default createIncomeChurch
