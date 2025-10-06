import { Request, Response } from 'express'
import { exportMonasteriosExcel } from '@services/generarExcel/ExportMonasteriosExcel'

export const exportMonasteriosExcelController = async (
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

    // Generar Excel
    const buffer = await exportMonasteriosExcel(startDate, endDate)

    // Configurar cabeceras para descarga
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Reporte_Monasterios_${startDate}_a_${endDate}.xlsx"`,
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
        : 'Error desconocido en exportMonasteriosExcelController'

    res.status(500).json({
      success: false,
      message: `Error en exportMonasteriosExcelController: ${message}`,
    })
  }
}
