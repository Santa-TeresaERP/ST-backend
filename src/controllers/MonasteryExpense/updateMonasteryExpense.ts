import { Request, Response } from 'express'
import updateMonasteryExpenseService from '@services/MonasteryExpense/serviceUpdateMonasteryExpense'

export default async function updateMonasteryExpense(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params
    const data = req.body

    const result = await updateMonasteryExpenseService(id, data)

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      })
    }

    return res.status(200).json({
      success: true,
      data: result.data,
      message: result.message,
    })
  } catch (error) {
    console.error('Error en el controlador updateMonasteryExpense:', error)
    return res.status(500).json({
      success: false,
      message:
        'Error interno del servidor al actualizar el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}
