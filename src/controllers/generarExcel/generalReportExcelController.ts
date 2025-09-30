import { Request, Response } from 'express'
import { generateGeneralReportExcel } from '@services/generarExcel/generateGeneralReportExcel'

export const getGeneralReportExcelController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { startDate, endDate } = req.body

    if (!startDate || !endDate) {
      res
        .status(400)
        .json({ success: false, message: 'Debes enviar startDate y endDate' })
      return
    }

    const excelBuffer = await generateGeneralReportExcel(startDate, endDate)

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ReporteGeneral_${startDate}_${endDate}.xlsx`,
    )

    res.send(excelBuffer)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    res.status(500).json({
      success: false,
      message: `Error en getGeneralReportExcelController: ${message}`,
    })
  }
}
