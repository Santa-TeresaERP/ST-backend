import { Request, Response } from 'express'
import useSuppliers from '@services/supplier'

const deleteSupplier = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await useSuppliers.deleteSupplier(id)

  if ('error' in result) {
    res.status(404).json({ error: result.error })
  }

  res.status(200).json({ message: 'Proveedor eliminado correctamente' })
}

export default deleteSupplier
