import { Request, Response } from 'express'
import { exportVentasExcel } from '@services/generarExcel/ExportVentasExcel'

export const exportVentasExcelController = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        message: 'Debes enviar startDate y endDate en el body',
      })
    }

    const buffer = await exportVentasExcel(startDate, endDate)

    // Cabeceras para descargar como archivo Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=DepartamentoVentas_${startDate}_${endDate}.xlsx`
    )

    res.send(buffer)
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Error en exportVentasExcelController: ${error.message}`,
    })
  }
}
