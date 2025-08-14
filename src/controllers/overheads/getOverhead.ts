import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const getOverheadController = async (req: Request, res: Response) => {
  const { getOverhead } = useOverhead()
  const { id } = req.params

  try {
    const overhead = await getOverhead(id)

    if ('error' in overhead) {
      res.status(404).json({ error: overhead.error })
      return
    }

    res.status(200).json(overhead)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
