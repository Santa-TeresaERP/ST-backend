import { Request, Response } from 'express'
import useRentals from '@services/Rentals'

const deleteRentalController = async (req: Request, res: Response) => {
  try {
    const result = await useRentals.serviceDeleteRental(req.params.id)
    if ('error' in result) {
      res.status(404).json(result)
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    console.error('Error deleting rental:', error)
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

export default deleteRentalController
