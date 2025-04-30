import { Request, Response } from 'express'
import useSuppliers from '@services/supplier'

const updateSupplier = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await useSuppliers.updateSupplier(id, req.body)

  if ('error' in result) {
    res.status(400).json({ error: result.error })
  }

  res.status(200).json(result)
}

export default updateSupplier
