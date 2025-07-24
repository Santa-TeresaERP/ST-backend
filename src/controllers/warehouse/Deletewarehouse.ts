import useWarehouse from '@services/warehouse/index'
import { Request, Response } from 'express'

const deleteWarehouseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params
  const { status } = req.body

  if (typeof status !== 'boolean') {
    res
      .status(400)
      .json({ error: 'El campo "status" es requerido y debe ser booleano' })
    return
  }

  const result = await useWarehouse.serviceDeleteWarehouse(id, status)

  if ('error' in result) {
    res.status(404).json({ error: result.error })
    return
  }

  res.status(200).json({
    message: `Estado del almacén actualizado a ${status ? 'activo' : 'inactivo'}`,
    data: result,
  })

  console.log('BODY:', req.body)
}

export default deleteWarehouseController
