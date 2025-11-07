import { Request, Response } from 'express'
import useRentChurch from '@services/RentChurch'

const updateRentChurchController = async (req: Request, res: Response) => {
  try {
    const rentRecord = await useRentChurch.serviceUpdateRentChurch(
      req.params.id,
      req.body,
    )
    if ('error' in rentRecord) {
      res.status(404).json(rentRecord)
    } else {
      res.status(200).json(rentRecord)
    }
  } catch (error) {
    console.error('Error updating rent church:', error)
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default updateRentChurchController
