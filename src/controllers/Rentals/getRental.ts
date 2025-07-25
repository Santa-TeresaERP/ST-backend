import { Request, Response } from 'express'
import useRentals from '@services/Rentals'

const getRentalController = async (req: Request, res: Response) => {
  try {
    const rentalRecord = await useRentals.serviceGetRental(req.params.id)
    if ('error' in rentalRecord) {
      res.status(404).json(rentalRecord)
    } else {
      res.status(200).json(rentalRecord)
    }
  } catch (error) {
    console.error('Error fetching rental:', error)
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

export default getRentalController
