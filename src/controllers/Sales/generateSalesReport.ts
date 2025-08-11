import { Request, Response } from 'express'
import serviceGenerateSalesReport from '@services/Sale/serviceGenerateSalesReport'

const generateSalesReportController = async (req: Request, res: Response) => {
  const { storeId, month, year, day } = req.query

  // Validar parámetros
  if (!storeId || !month || !year) {
    return res
      .status(400)
      .json({ error: 'Faltan parámetros: storeId, month, year' })
  }
  const monthNum = Number(month)
  const yearNum = Number(year)
  const dayNum = day ? Number(day) : 1 // Usar 1 si no se envía el día

  if (
    isNaN(monthNum) ||
    isNaN(yearNum) ||
    isNaN(dayNum) ||
    monthNum < 1 ||
    monthNum > 12 ||
    yearNum < 2000 ||
    dayNum < 1 ||
    dayNum > 31
  ) {
    return res
      .status(400)
      .json({ error: 'Parámetros inválidos: day, month, year' })
  }

  const result = await serviceGenerateSalesReport({
    storeId: String(storeId),
    day: dayNum,
    month: monthNum,
    year: yearNum,
  })
  if ('error' in result) {
    return res.status(400).json(result)
  }
  return res.status(200).send(result.report)
}

export default generateSalesReportController
