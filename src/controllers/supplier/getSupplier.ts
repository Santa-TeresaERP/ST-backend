import { Request, Response } from 'express'
import useSuppliers from '@services/supplier'

const getSupplier = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await useSuppliers.getSupplier(id)

  if (!result) {
    res.status(404).json({ error: 'Proveedor no encontrado' })
  }

  res.status(200).json(result)
}

export default getSupplier
