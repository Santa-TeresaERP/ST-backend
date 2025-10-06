import { Request, Response } from 'express'
import { getDataDeMonasterio } from '@services/generarExcel/getDataDeMonasterio'

export const getMonasterioDataController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar startDate y endDate',
      })
    }

    const result = await getDataDeMonasterio(startDate, endDate)

    if (!result.success) {
      res.status(500).json({
        success: false,
        message: result.message,
      })
    }

    res.json({
      success: true,
      message: result.message,
      data: result.data,
    })
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getMonasterioDataController'

    res.status(500).json({
      success: false,
      message: `Error en getMonasterioDataController: ${message}`,
    })
  }
}
