import { Request, Response } from 'express'
import useFinancialReport from '@services/FinancialReport'

const createFinancialReportController = async (req: Request, res: Response) => {
  try {
    const result = await useFinancialReport.create(req.body)

    if (result && 'error' in result) {
      res.status(400).json({ message: result.error })
    } else {
      res.status(201).json(result)
    }
  } catch (error) {
    console.error('Error en el controlador de creación de reporte:', error)
    res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

export default createFinancialReportController
