import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const createOverheadsController = async (
  req: Request,
  res: Response,
) => {
  const { createOverhead } = useOverhead()
  const overheadData = req.body

  try {
    const newOverhead = await createOverhead(overheadData)

    if ('error' in newOverhead) {
      res.status(400).json({ error: newOverhead.error })
      return
    }

    res.status(201).json(newOverhead)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
