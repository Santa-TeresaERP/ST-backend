import { Request, Response } from 'express'
import index from '@services/Resource/index'

const createResourceController = async (req: Request, res: Response) => {
  try {
    const resource = await index.serviceCreateResource(req.body)
    if ('error' in resource) {
      res.status(400).json({ error: resource.error })
    }
    res.status(201).json({ message: 'Recurso creado exitosamente', resource })
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default createResourceController
