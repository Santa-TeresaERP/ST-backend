// @services/common/generadorDePdf.ts
import PDFDocument from 'pdfkit'

export type PdfBuildOptions = {
  title?: string
  subtitle?: string
  body: string // contenido monoespaciado
  filenameBase: string // base del nombre sin extensión
  boxed?: boolean // dibujar caja con fondo suave
}

export async function generarPdfMonoespaciado({
  title = 'Reporte',
  subtitle,
  body,
  filenameBase,
  boxed = true,
}: PdfBuildOptions): Promise<{
  filename: string
  mimeType: 'application/pdf'
  buffer: Buffer
}> {
  const buffer = await buildBuffer({ title, subtitle, body, boxed })
  return {
    filename: `${filenameBase}.pdf`,
    mimeType: 'application/pdf',
    buffer,
  }
}

// ---------- internals ----------
function buildBuffer({
  title,
  subtitle,
  body,
  boxed,
}: {
  title: string
  subtitle?: string
  body: string
  boxed: boolean
}) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 48 })
    const chunks: Buffer[] = []

    doc.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    // Metadata (no reasignar doc.info)
    doc.info.Title = title
    doc.info.Author = 'Sistema'
    doc.info.Subject = 'Documento generado'
    doc.info.CreationDate = new Date()
    doc.info.ModDate = new Date()

    // Footer (paginación)
    let page = 1
    const footer = () => {
      const y = doc.page.height - doc.page.margins.bottom + 12
      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#666')
        .text(`Página ${page}`, doc.page.margins.left, y, {
          width:
            doc.page.width - doc.page.margins.left - doc.page.margins.right,
          align: 'center',
        })
      doc.fillColor('#000')
    }
    footer()
    doc.on('pageAdded', () => {
      page++
      footer()
    })

    // Header
    doc.font('Helvetica-Bold').fontSize(20).fillColor('#111').text(title)
    if (subtitle) {
      doc.moveDown(0.2)
      doc.font('Helvetica').fontSize(11).fillColor('#444').text(subtitle)
    }

    // separador
    doc.moveDown(0.6)
    const yHr = doc.y
    doc
      .moveTo(doc.page.margins.left, yHr)
      .lineTo(doc.page.width - doc.page.margins.right, yHr)
      .lineWidth(1)
      .stroke('#BDBDBD')
    doc.moveDown(0.8)

    // contenedor
    const x = doc.page.margins.left
    const y = doc.y
    const w = doc.page.width - doc.page.margins.left - doc.page.margins.right
    const h = doc.page.height - y - doc.page.margins.bottom - 24

    if (boxed) {
      doc.save()
      doc.roundedRect(x, y, w, h, 8).fillOpacity(0.06).fill('#000')
      doc.restore()
      doc.roundedRect(x, y, w, h, 8).lineWidth(0.8).stroke('#E0E0E0')
    }

    const pad = boxed ? 14 : 0
    doc
      .font('Courier')
      .fontSize(10)
      .fillColor('#111')
      .text(body, x + pad, y + pad, {
        width: w - pad * 2,
        align: 'left',
        lineGap: 2,
      })

    doc.end()
  })
}
