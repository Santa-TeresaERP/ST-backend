import { Request, Response } from 'express'
import useGeneralExpense from '@services/GeneralExpense'

const updateGeneralExpenseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useGeneralExpense.update(id, req.body)

    if (result && 'error' in result) {
      // Si el error es "no encontrado" devuelve 404, si no 400 (ej. "ya está en un reporte")
      const statusCode = result.error.includes('encontrado') ? 404 : 400
      res.status(statusCode).json({ message: result.error })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error en el controlador de actualización de gasto:', error)
    res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

export default updateGeneralExpenseController
