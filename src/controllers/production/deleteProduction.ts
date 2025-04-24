import { Request, Response } from 'express'
import useProduction from '@services/Production/index'

const deleteProductionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useProduction.deleteProduction(id)

    if (result?.error) {
      res.status(404).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error deleting production:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default deleteProductionController
