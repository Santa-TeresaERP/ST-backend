import index from '@services/Resource/index'
import { Request, Response } from 'express'

const deleteResourceController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const resource = await index.serviceDeleteResource(req.params.id)
    if ('error' in resource) {
      res.status(400).json({ error: resource.error })
      return
    }
    res.json({ message: 'Recurso eliminado exitosamente' })
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default deleteResourceController
