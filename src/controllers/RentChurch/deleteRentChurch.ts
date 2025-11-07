import { Request, Response } from 'express'
import useRentChurch from '@services/RentChurch'

const deleteRentChurchController = async (req: Request, res: Response) => {
  try {
    const result = await useRentChurch.serviceDeleteRentChurch(req.params.id)
    if ('error' in result) {
      res.status(404).json(result)
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    console.error('Error deleting rent church:', error)
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default deleteRentChurchController
