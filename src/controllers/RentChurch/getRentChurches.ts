import { Request, Response } from 'express'
import useRentChurch from '@services/RentChurch'

const getRentChurchesController = async (_: Request, res: Response) => {
  try {
    const rents = await useRentChurch.serviceGetRentChurches()
    res.status(200).json(rents)
  } catch (error) {
    console.error('Error fetching rent churches:', error)
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: 'Internal Server Error', message: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default getRentChurchesController
