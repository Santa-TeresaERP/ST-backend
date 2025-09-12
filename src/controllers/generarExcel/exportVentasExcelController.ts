import { Request, Response } from 'express'
import { exportVentasExcel } from '@services/generarExcel/ExportVentasExcel'

export const exportVentasExcelController = async (
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

    const buffer = await exportVentasExcel(startDate, endDate)

    // Configurar cabeceras para descarga
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ventas_${startDate}_${endDate}.xlsx`,
    )
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    // Enviar archivo como binario
    res.send(buffer)
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en exportVentasExcelController'

    res.status(500).json({
      success: false,
      message: `Error al exportar Excel: ${message}`,
    })
  }
}
