import { Request, Response } from 'express'
import usePlaces from '@services/Places'

const getPlacesController = async (_req: Request, res: Response) => {
  try {
    const places = await usePlaces.serviceGetPlaces()
    res.status(200).json(places)
  } catch (error) {
    console.error('Error getting places:', error)
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

export default getPlacesController
