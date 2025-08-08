import { Request, Response } from 'express'
import useEntrance from '@services/entrance'

const createEntranceController = async (req: Request, res: Response) => {
  try {
    const result = await useEntrance.serviceCreateEntrance(req.body)

    if ('error' in result) {
      res.status(400).json(result)
      return
    }

    res.status(201).json(result)
  } catch (error) {
    console.error('Error creating entrance:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default createEntranceController
