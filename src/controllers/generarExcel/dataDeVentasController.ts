import { Request, Response } from 'express'
import { getGeneralReport } from '@services/generarExcel/DataDepVentas'

export const getDataDeVentasController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar startDate y endDate en el body',
      })
      return
    }

    const result = await getGeneralReport(startDate, endDate)

    if (!result.success) {
      res.status(400).json(result)
      return
    }

    res.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido'

    res.status(500).json({
      success: false,
      message: `Error en getDataDeVentasController: ${message}`,
    })
  }
}
