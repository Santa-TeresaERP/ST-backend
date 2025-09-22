import { Request, Response } from 'express'
import getAllMonasteryExpensesService from '@services/MonasteryExpense/serviceGetAllMonasteryExpenses'

export default async function getAllMonasteryExpenses(
  _req: Request,
  res: Response,
) {
  try {
    const result = await getAllMonasteryExpensesService()

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      })
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    })
  } catch (error) {
    console.error('Error en el controlador getAllMonasteryExpenses:', error)
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener los gastos del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}
