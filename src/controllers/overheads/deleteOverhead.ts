import useOverhead from '@services/overhead'
import { Request, Response } from 'express'

export const deleteOverheadController = async (req: Request, res: Response) => {
  const { deleteOverhead } = useOverhead()
  const { id } = req.params

  try {
    const result = await deleteOverhead(id)

    if ('error' in result) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    })
  }
}
