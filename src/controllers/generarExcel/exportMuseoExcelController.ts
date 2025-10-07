import { Request, Response } from 'express'
import { exportMuseoExcel } from '@services/generarExcel/ExportMuseoExcel'

export const exportMuseoExcelController = async (
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

    // Generar el Excel como Buffer
    const buffer = await exportMuseoExcel(startDate, endDate)

    // Configurar headers para descargar el archivo
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=reporte_museo_${startDate}_a_${endDate}.xlsx`,
    )

    res.send(buffer)
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en exportMuseoExcelController'
    res.status(500).json({
      success: false,
      message: `Error en exportMuseoExcelController: ${message}`,
    })
  }
}
