import { Request, Response } from 'express'
import useProduction from '@services/Production/index'

const updateProductionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const production = await useProduction.updateProduction(id, req.body)

    if (!production) {
      res.status(400).json({ error: 'Production not found' })
    }

    res.status(200).json(production)
  } catch (error) {
    console.error('Error updating production:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default updateProductionController
