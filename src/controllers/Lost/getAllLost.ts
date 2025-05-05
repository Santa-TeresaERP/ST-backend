import { Request, Response } from 'express'
import useLost from '@services/Lost'

const getAllLost = async (req: Request, res: Response) => {
  try {
    const filters = {
      product_id: req.query.product_id as string,
      lost_type: req.query.lost_type as string,
      start_date: req.query.start_date
        ? new Date(req.query.start_date as string)
        : undefined,
      end_date: req.query.end_date
        ? new Date(req.query.end_date as string)
        : undefined,
    }
    const lostRecords = await useLost.getAllLost(filters)
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
