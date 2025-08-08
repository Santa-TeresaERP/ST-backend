import { Request, Response } from 'express'
import useRentals from '@services/Rentals'

const getRentalsController = async (_: Request, res: Response) => {
  try {
    const rentals = await useRentals.serviceGetRentals()
    res.status(200).json(rentals)
  } catch (error) {
    console.error('Error fetching rentals:', error)
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

export default getRentalsController
