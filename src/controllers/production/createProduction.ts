import { Request, Response } from 'express'
import useProductions from '@services/Production/index'

const createProductionController = async (req: Request, res: Response) => {
  try {
    const production = await useProductions.createProduction(req.body)
    res.status(201).json(production)
  } catch (error) {
    console.error('Error creating production:', error)

    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      })
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unknown error occurred',
      })
    }
  }
}

export default createProductionController
