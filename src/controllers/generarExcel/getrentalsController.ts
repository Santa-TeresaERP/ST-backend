import { Request, Response } from 'express'
import { getDataDeAlquileres } from '@services/generarExcel/getDataDeAlquileres'

export const getAlquileresData = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar startDate y endDate en el body',
      })
    }

    const result = await getDataDeAlquileres(startDate, endDate)

    if (!result.success) {
      res.status(500).json(result)
    }

    res.status(200).json(result)
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getAlquileresData'

    res.status(500).json({
      success: false,
      message: `Error en el controlador: ${message}`,
    })
  }
}
