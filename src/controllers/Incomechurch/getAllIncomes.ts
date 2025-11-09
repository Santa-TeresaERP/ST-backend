import { Request, Response } from 'express'
import useIncomeChurch from '@services/IncomeChurch'

const { serviceGetAllIncomes } = useIncomeChurch

const getAllIncomes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await serviceGetAllIncomes()

    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json({
      message: 'Todos los ingresos de la iglesia obtenidos exitosamente',
      incomes: result.incomes,
    })
  } catch (error) {
    console.error('Error en getAllIncomes.controller:', error)
    res.status(500).json({
      error: 'Error interno al obtener todos los ingresos de la iglesia.',
    })
  }
}

export default getAllIncomes
