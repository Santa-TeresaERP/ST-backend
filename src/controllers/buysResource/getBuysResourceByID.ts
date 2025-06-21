import { Request, Response } from 'express'
import serviceGetBuysResourceById from '@services/BuysResource/serviceGetBuysResourceByID'

const GetBuysResourceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const resource = await serviceGetBuysResourceById(id)
    res.status(200).json(resource)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido'
    res.status(404).json({ message: errorMessage })
  }
}

export default GetBuysResourceById
