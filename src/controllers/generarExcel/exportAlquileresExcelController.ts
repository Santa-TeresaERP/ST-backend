import { Request, Response } from 'express'
import { exportAlquileresExcel } from '@services/generarExcel/ExportAlquileresExcel'

export const exportAlquileresExcelController = async (
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

    // Llamar al service que genera el Excel
    const buffer = await exportAlquileresExcel(startDate, endDate)

    // Configurar cabeceras para descarga
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Reporte_Alquileres_${startDate}_a_${endDate}.xlsx"`,
    )
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    // Enviar el archivo
    res.send(buffer)
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en exportAlquileresExcelController'
    res.status(500).json({
      success: false,
      message,
    })
  }
}
