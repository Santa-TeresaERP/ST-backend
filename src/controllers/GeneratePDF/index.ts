// @controllers/GeneratePDF/index.ts
import { Request, Response } from 'express'
import serviceGenerateSalesReport from '@services/Sale/serviceGenerateSalesReport'
import { generarPdfMonoespaciado } from '@services/generadorDePDF/generadorDePdf'

type ServicesMap = {
  [key: string]: (args: any) => Promise<any>
}

// Mapa de servicios soportados
const services: ServicesMap = {
  sale: serviceGenerateSalesReport,
  // aquí luego puedes registrar más: 'warehouse': serviceWarehouseReport, etc.
}

export default async function generatePDFController(
  req: Request,
  res: Response,
) {
  try {
    const { serviceKey } = req.params
    const handler = services[serviceKey]
    if (!handler) {
      res.status(404).json({
        success: false,
        message: `Servicio no soportado: ${serviceKey}`,
      })
    }

    // Body trae parámetros propios del servicio (ej. storeId, day, month, year)
    const args = req.body || {}

    // Ejecuta servicio y obtiene el texto del reporte
    const result = await handler(args)

    if (result?.error) {
      res.status(400).json({ success: false, message: result.error })
    }

    // Soporta ambos formatos: { report } o { success, data.report_text }
    const reportText: string = result?.data?.report_text ?? result?.report ?? ''

    if (!reportText) {
      res.status(500).json({
        success: false,
        message: 'No se pudo obtener el contenido del reporte',
      })
    }

    // Nombre base
    const filenameBase =
      args?.filenameBase ||
      `${serviceKey}_reporte_${new Date().toISOString().slice(0, 10)}`

    // Subtítulo útil (si el body trae fecha/tienda)
    const subtitulo =
      [
        args?.dateLabel ||
          `${args?.day ?? ''}/${args?.month ?? ''}/${args?.year ?? ''}`.replace(
            /^\/\/$/,
            '',
          ),
        args?.storeName,
      ]
        .filter(Boolean)
        .join(' · ') || undefined

    const pdf = await generarPdfMonoespaciado({
      title: `Reporte ${serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)}`,
      subtitle: subtitulo,
      body: reportText,
      filenameBase,
      boxed: true,
    })

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${pdf.filename}"`,
    )
    res.type(pdf.mimeType)
    res.send(pdf.buffer)
  } catch (err) {
    console.error('[GeneratePDF] Error:', err)
    res.status(500).json({ success: false, message: 'Error al generar PDF' })
  }
}
