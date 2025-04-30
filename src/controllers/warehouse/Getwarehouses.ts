import { Request, Response } from 'express'
import useWarehouse from '@services/warehouse/index'

const controllerGetWarehouses = async (_req: Request, res: Response) => {
  const result = await useWarehouse.serviceGetWarehouses()
  res.json(result)
}

export default controllerGetWarehouses
