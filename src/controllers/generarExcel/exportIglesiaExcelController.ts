import { Request, Response } from 'express'
import { exportIglesiaExcel } from '@services/generarExcel/ExportIglesiaExcel'

export const exportIglesiaExcelController = async (
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
    const buffer = await exportIglesiaExcel(startDate, endDate)

    // Configurar cabeceras para descarga
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Reporte_Iglesia_${startDate}_a_${endDate}.xlsx"`,
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
        : 'Error desconocido en exportIglesiaExcelController'

    res.status(500).json({
      success: false,
      message,
    })
  }
}
