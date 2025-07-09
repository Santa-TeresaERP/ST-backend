import { Request, Response } from 'express'
import useResource from '@services/Resource/index'

const controllerGetResources = async (_req: Request, res: Response) => {
  try {
    const resources = await useResource.serviceGetResources()
    res.status(200).json(resources)
  } catch (error) {
    console.error('Error getting resources:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default controllerGetResources
