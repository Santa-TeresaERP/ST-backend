import { Request, Response } from 'express'
import useWarehouseResource from '@services/warehouseResource'

const CreateWarehouseResource = async (req: Request, res: Response) => {
  try {
    const result = await useWarehouseResource.serviceCreateWarehouseResource(
      req.body,
    )

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    } else {
      res.status(201).json({
        message: 'Recurso de almacén creado exitosamente',
        resource: result,
      })
    }
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default CreateWarehouseResource
