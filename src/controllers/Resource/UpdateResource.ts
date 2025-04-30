import { Request, Response } from 'express'
import useResourse from '@services/Resource'

const controllerUpdateResource = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await useResourse.serviceUpdateResource(id, req.body)

  if ('error' in result) {
    res.status(400).json({ error: result.error })
  }

  res.json(result)
}

export default controllerUpdateResource
