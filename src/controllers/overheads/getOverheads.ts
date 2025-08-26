import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const getOverheadsController = async (_req: Request, res: Response) => {
  const { getOverheads } = useOverhead()

  try {
    const overhead = await getOverheads()
    res.status(200).json(overhead)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred'
    const status = message === 'Overhead not found' ? 404 : 500
    res.status(status).json({ error: message })
  }
}
