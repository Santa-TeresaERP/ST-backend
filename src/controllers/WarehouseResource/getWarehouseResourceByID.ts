import { Request, Response } from 'express'
import GetWarehouseResourceByIdService from 'src/services/warehouseResource/serviceGetWarehouseResourceByID'

const GetWarehouseResourceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const resource = await GetWarehouseResourceByIdService(id)
    res.status(200).json(resource)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido'
    res.status(404).json({ message: errorMessage })
  }
}

export default GetWarehouseResourceById
