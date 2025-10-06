import { Request, Response } from 'express'
import { exportVentasExcel } from '../../services/generarExcel/ExportVentasExcel'

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

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ventas_${startDate}_to_${endDate}.xlsx`,
    )
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    res.send(buffer)
  } catch (error: any) {
    console.error('Error al exportar Excel de ventas:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno al generar Excel de ventas',
      error: error.message,
    })
  }
}
