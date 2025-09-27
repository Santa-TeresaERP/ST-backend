import { NextFunction, Request, Response } from 'express'
import createMonasteryExpenseService from '@services/MonasteryExpense/serviceCreateMonasteryExpense'
import { monasteryExpenseSchema } from '../../schemas/finanzas/monasteryexpense'

export default async function createMonasteryExpense(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const validatedData = monasteryExpenseSchema.safeParse(req.body)

    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: validatedData.error.errors,
      })
    }

    const data = validatedData.data
    const result = await createMonasteryExpenseService(data)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
        error: result.error,
      })
      next()
      return
    }

    res.status(201).json({
      success: true,
      data: result.data,
      message: result.message,
    })
    next()
  } catch (error) {
    console.error('Error en el controlador createMonasteryExpense:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al crear el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
    next(error)
  }
}
