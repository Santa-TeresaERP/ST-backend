// src/controllers/Sales/generateSalesReport.ts
import { Request, Response } from 'express'
import serviceGenerateSalesReport from '@services/Sale/serviceGenerateSalesReport'

const generateSalesReportController = async (req: Request, res: Response) => {
  const { storeId, from, to } = req.query

  // Validar parámetros requeridos
  if (!storeId || !from || !to) {
    return res
      .status(400)
      .json({ error: 'Faltan parámetros: storeId, from, to' })
  }

  // Parsear fechas
  const fromDate = new Date(String(from))
  const toDate = new Date(String(to))

  // Validaciones básicas de fechas
  if (isNaN(+fromDate) || isNaN(+toDate)) {
    return res.status(400).json({ error: 'Fechas inválidas: from, to' })
  }
  if (fromDate > toDate) {
    return res
      .status(400)
      .json({ error: 'El parámetro "from" no puede ser mayor que "to"' })
  }

  // Llamar al servicio
  const result = await serviceGenerateSalesReport({
    storeId: String(storeId),
    from: fromDate,
    to: toDate,
  })

  if ('error' in result) {
    return res.status(400).json(result)
  }

  // Devuelve el reporte de texto (compatibilidad con tu ruta actual)
  return res.status(200).send(result.report)

  // Si prefieres JSON estructurado, usa:
  // return res.status(200).json(result)
}

export default generateSalesReportController
