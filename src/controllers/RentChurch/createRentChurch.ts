import { Request, Response } from 'express'
import useRentChurch from '@services/RentChurch'

const createRentChurchController = async (req: Request, res: Response) => {
  try {
    const rentRecord = await useRentChurch.serviceCreateRentChurch(req.body)
    if ('error' in rentRecord) {
      res.status(400).json(rentRecord)
    } else {
      res.status(201).json(rentRecord)
    }
  } catch (error) {
    console.error('Error creating rent church:', error)
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default createRentChurchController
