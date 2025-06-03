import { Request, Response } from 'express'
import useLost from '@services/Lost'

const getAllLost = async (_req: Request, res: Response) => {
  try {
    const lostRecords = await useLost.getAllLost()
    res.status(200).json(lostRecords)
  } catch (error) {
    console.error('Error getting lost records:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getAllLost
