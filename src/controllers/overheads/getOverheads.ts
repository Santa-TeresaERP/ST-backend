import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const getOverheadsController = async (_req: Request, res: Response) => {
  const { getOverheads } = useOverhead()

  try {
    const overheads = await getOverheads()
    res.status(200).json(overheads)
  } catch (error) {
    console.error('Error in getOverheadsController:', error)
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred'
    res.status(500).json({ error: message })
  }
}
