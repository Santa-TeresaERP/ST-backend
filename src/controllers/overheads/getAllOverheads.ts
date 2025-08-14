import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const getAllOverheadsController = async (
  _req: Request,
  res: Response,
) => {
  const { getAllOverheads } = useOverhead()

  try {
    const overheads = await getAllOverheads()

    if ('error' in overheads) {
      res.status(400).json({ error: overheads.error })
      return
    }

    res.status(200).json(overheads)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
