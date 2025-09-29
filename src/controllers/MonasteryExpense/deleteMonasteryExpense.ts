import { Request, Response } from 'express'
import deleteMonasteryExpenseService from '@services/MonasteryExpense/serviceDeleteMonasteryExpense'

export default async function deleteMonasteryExpense(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params
    const result = await deleteMonasteryExpenseService(id)

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      })
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    })
  } catch (error) {
    console.error('Error en el controlador deleteMonasteryExpense:', error)
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al eliminar el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}
