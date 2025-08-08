import { Request, Response } from 'express'
import useFinancialReport from '@services/FinancialReport'

const updateFinancialReportController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useFinancialReport.update(id, req.body)

    if (result && 'error' in result) {
      // Usamos 404 si el error es 'no encontrado', 400 para otros errores de negocio
      res
        .status(result.error.includes('encontrado') ? 404 : 400)
        .json({ message: result.error })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error en el controlador de actualización de reporte:', error)
    res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

export default updateFinancialReportController
