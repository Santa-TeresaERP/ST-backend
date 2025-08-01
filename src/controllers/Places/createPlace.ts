import { Request, Response } from 'express'
import usePlaces from '@services/Places'

const createPlaceController = async (req: Request, res: Response) => {
  try {
    const placeRecord = await usePlaces.serviceCreatePlace(req.body)
    if ('error' in placeRecord) {
      res.status(400).json(placeRecord)
    } else {
      res.status(201).json(placeRecord)
    }
  } catch (error) {
    console.error('Error creating place:', error)
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message })
    } else {
      res.status(500).json({ error: 'Internal Server Error', message: 'Unknown error occurred' })
    }
  }
}

export default createPlaceController
