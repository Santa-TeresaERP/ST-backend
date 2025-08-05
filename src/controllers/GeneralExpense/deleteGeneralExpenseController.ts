import { Request, Response } from 'express'
import useGeneralExpense from '@services/GeneralExpense'

const deleteGeneralExpenseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useGeneralExpense.delete(id)

    if (result && 'error' in result) {
      const errorMessage = (result.error as string) || ''

      const statusCode = errorMessage.includes('encontrado') ? 404 : 400

      res.status(statusCode).json({ message: errorMessage })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error en el controlador de eliminación de gasto:', error)
    res.status(500).json({ message: 'Error interno del servidor.' })
  }
}

export default deleteGeneralExpenseController
