import { Request, Response } from 'express'
import usePlaces from '@services/Places'

const updatePlaceController = async (req: Request, res: Response) => {
  try {
    const place = await usePlaces.serviceUpdatePlace(req.params.id, req.body)
    if ('error' in place) {
      res.status(400).json(place)
    } else {
      res.status(200).json(place)
    }
  } catch (error) {
    console.error('Error updating place:', error)
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

export default updatePlaceController
