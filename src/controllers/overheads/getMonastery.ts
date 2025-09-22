import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const getMonasteryController = async (_req: Request, res: Response) => {
  const { getMonastery } = useOverhead()

  try {
    const monasteryExpenses = await getMonastery()
    res.status(200).json(monasteryExpenses)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
