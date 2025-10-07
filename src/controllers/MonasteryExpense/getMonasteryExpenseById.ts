import { Request, Response } from 'express'
import getMonasteryExpenseByIdService from '@services/MonasteryExpense/serviceGetMonasteryExpenseById'

export default async function getMonasteryExpenseById(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params
    const result = await getMonasteryExpenseByIdService(id)

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      })
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error('Error en el controlador getMonasteryExpenseById:', error)
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}
