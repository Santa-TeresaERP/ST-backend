import { Request, Response } from 'express'
import useSuppliers from '@services/supplier'

const getSuppliers = async (_req: Request, res: Response) => {
  const result = await useSuppliers.getSuppliers()
  res.status(200).json(result)
}

export default getSuppliers
