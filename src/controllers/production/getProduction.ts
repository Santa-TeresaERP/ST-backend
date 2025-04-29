import { Request, Response } from 'express'
import useProductions from '@services/Production'

const getProductionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const production = await useProductions.getProduction(id)

    if (!production) {
      res.status(404).json({ error: 'Production not found' })
    }

    res.status(200).json(production)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getProductionController
