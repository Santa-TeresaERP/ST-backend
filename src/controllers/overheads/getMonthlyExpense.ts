import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const getMonthlyExpenseController = async (
  _req: Request,
  res: Response,
) => {
  const { getMonthlyExpense } = useOverhead()

  try {
    const result = await getMonthlyExpense()

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.message,
        error: result.error,
      })
    }

    res.status(200).json({
      success: true,
      data: result.data,
      message: result.message,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
