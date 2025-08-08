import { Request, Response } from 'express'
import useFinancialReport from '@services/FinancialReport'

const deleteFinancialReportController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useFinancialReport.delete(id)

    if (result && 'error' in result) {
      // [CORREGIDO] Dentro de este bloque 'if', TypeScript ya sabe que `result.error` existe.
      // Ahora, la comprobación 'includes' se puede hacer de forma segura.
      // Le damos un valor por defecto al error por si acaso es nulo, aunque es poco probable.
      const errorMessage = (result.error as string) || ''

      const statusCode = errorMessage.includes('encontrado') ? 404 : 400

      res.status(statusCode).json({ message: errorMessage })
    }
    // Para DELETE, una respuesta 200 con mensaje o 204 No Content son comunes.
    res.status(200).json(result)
  } catch (error) {
    console.error('Error en el controlador de eliminación de reporte:', error)
    res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

export default deleteFinancialReportController
