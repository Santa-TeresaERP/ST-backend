import { Request, Response } from 'express'
import useWarehouse from '@services/warehouse'

const controllerUpdateWarehouse = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await useWarehouse.serviceUpdateWarehouse(id, req.body)

  if ('error' in result) {
    res.status(400).json({ error: result.error })
    return
  }

  res.json(result)
}

export default controllerUpdateWarehouse
