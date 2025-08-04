import { Request, Response } from 'express'
import useEntrance from '@services/entrance'

const updateEntranceController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useEntrance.serviceUpdateEntrance(id, req.body)

    if ('error' in result) {
      res.status(400).json(result)
      return
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error updating entrance:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default updateEntranceController
