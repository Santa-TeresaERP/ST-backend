import { Request, Response } from 'express'
import useRentals from '@services/Rentals'

const createRentalController = async (req: Request, res: Response) => {
  try {
    const rentalRecord = await useRentals.serviceCreateRental(req.body)
    if ('error' in rentalRecord) {
      res.status(400).json(rentalRecord)
    } else {
      res.status(201).json(rentalRecord)
    }
  } catch (error) {
    console.error('Error creating rental:', error)
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message })
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unknown error occurred',
      })
    }
  }
}

export default createRentalController
