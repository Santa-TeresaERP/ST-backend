import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const getMonthlyExpenseController = async (
  _req: Request,
  res: Response,
) => {
  const { getMonthlyExpense } = useOverhead()

  try {
    const monthlyExpenses = await getMonthlyExpense()

    if ('error' in monthlyExpenses) {
      res.status(400).json({ error: monthlyExpenses.error })
      return
    }

    res.status(200).json(monthlyExpenses)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
