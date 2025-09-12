import { Request, Response } from 'express'
import { exportRentalsExcel } from '@services/generarExcel/exportRentalsExcel'

export const exportRentalsExcelController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar startDate y endDate en el body',
      })
    }

    const buffer = await exportRentalsExcel(startDate, endDate)

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="alquileres_${startDate}_a_${endDate}.xlsx"`,
    )
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    res.send(buffer)
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al generar el Excel de alquileres',
    })
  }
}
