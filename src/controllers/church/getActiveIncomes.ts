import { Request, Response } from 'express'
import useIncomeChurch from '@services/church'

const { serviceGetActiveIncomes } = useIncomeChurch

const getActiveIncomes = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await serviceGetActiveIncomes()

    if (!result.success) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json({
      message: 'Ingresos activos de la iglesia obtenidos exitosamente',
      incomes: result.incomes,
    })
  } catch (error) {
    console.error('Error en getActiveIncomes.controller:', error)
    res.status(500).json({
      error: 'Error interno al obtener los ingresos activos de la iglesia.',
    })
  }
}

export default getActiveIncomes
