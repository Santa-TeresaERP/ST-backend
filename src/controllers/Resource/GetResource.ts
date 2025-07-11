import { Request, Response } from 'express'
import useResource from '@services/Resource/index'

const controllerGetResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const resource = await useResource.serviceGetResource(id)

    if (!resource) {
      res.status(404).json({ error: 'Recurso no encontrado' })
    }

    res.status(200).json(resource)
  } catch (error) {
    console.error('Error getting resource:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default controllerGetResource
