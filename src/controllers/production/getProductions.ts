import { Request, Response } from 'express'
import useProduction from '@services/Production/index'

const getProductionsController = async (_req: Request, res: Response) => {
  try {
    const productions = await useProduction.getProductions()
    res.status(200).json(productions)
  } catch (error) {
    console.error('Error getting productions:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getProductionsController
