import { Request, Response } from 'express'
import useSuppliers from '@services/almacen/supplier'

const createSupplier = async (req: Request, res: Response) => {
  const result = await useSuppliers.createSupplier(req.body)

  if ('error' in result) {
    res.status(400).json({ error: result.error })
  }

  res.status(201).json(result)
}

export default createSupplier
