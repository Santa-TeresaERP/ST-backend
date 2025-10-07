import { Request, Response } from 'express'
import { getDataDeMuseo } from '@services/generarExcel/getDataDeMuseo'

export const getDataMuseoController = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar startDate y endDate',
      })
    }

    const result = await getDataDeMuseo(startDate, endDate)

    if (!result.success) {
      res.status(500).json(result)
    }

    res.status(200).json(result)
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getDataMuseoController'

    res.status(500).json({
      success: false,
      message: `Error en getDataMuseoController: ${message}`,
    })
  }
}
