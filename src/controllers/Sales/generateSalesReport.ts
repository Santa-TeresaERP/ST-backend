import { Request, Response } from 'express'
import serviceGenerateSalesReport from '@services/Sale/serviceGenerateSalesReport'

const generateSalesReportController = async (req: Request, res: Response) => {
  const { storeId, month, year } = req.query

  // Validar parámetros
  if (!storeId || !month || !year) {
    return res.status(400).json({ error: 'Faltan parámetros: storeId, month, year' })
  }
  const monthNum = Number(month)
  const yearNum = Number(year)
  if (
    isNaN(monthNum) ||
    isNaN(yearNum) ||
    monthNum < 1 ||
    monthNum > 12 ||
    yearNum < 2000
  ) {
    return res.status(400).json({ error: 'Parámetros inválidos: month, year' })
  }

  const result = await serviceGenerateSalesReport({
    storeId: String(storeId),
    month: monthNum,
    year: yearNum,
  })
  if ('error' in result) {
    return res.status(400).json(result)
  }
  return res.status(200).send(result.report)
}

export default generateSalesReportController