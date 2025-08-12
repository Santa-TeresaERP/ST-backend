import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const updateOverheadController = async (req: Request, res: Response) => {
  const { updateOverhead } = useOverhead()
  const { id } = req.params
  const overheadData = req.body

  try {
    const updatedOverhead = await updateOverhead(id, overheadData)

    if ('error' in updatedOverhead) {
      res.status(400).json({ error: updatedOverhead.error })
      return
    }

    res.status(200).json(updatedOverhead)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
