import { Request, Response } from 'express'
import { getDataDeVentas } from '@services/generarExcel/getDataDeVentas'

export const getDataVentasController = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar startDate y endDate',
      })
    }

    const result = await getDataDeVentas(startDate, endDate)

    if (!result.success) {
      res.status(500).json(result)
    }

    res.status(200).json(result)
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}
