import { Request, Response } from 'express'
import useResource from '@services/Resource/index'

const controllerGetResource = async (_req: Request, res: Response) => {
  const result = await useResource.serviceGetResources()
  res.json(result)
}

export default controllerGetResource
