import { Request, Response } from 'express'
import { serviceGetRentalsByDate } from '@services/generarExcel/serviceGetRentalsByDate'

export const getRentalsByDateController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { start_date, end_date } = req.body

    if (!start_date || !end_date) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar start_date y end_date en el body',
      })
    }

    const result = await serviceGetRentalsByDate(start_date, end_date)

    res.status(result.success ? 200 : 400).json(result)
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Error en getRentalsByDateController: ${error.message}`,
    })
  }
}
