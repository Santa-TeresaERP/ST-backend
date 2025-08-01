import { Request, Response } from 'express'
import useLocation from '@services/Locations' // Asegúrate de tener este archivo

const createLocation = async (req: Request, res: Response) => {
  try {
    const location = await useLocation.createLocation(req.body)
    res.status(201).json(location)
  } catch (error: unknown) {
    console.error('Error creating location:', error)

    let errorMessage = 'Unknown error occurred'
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      statusCode = error.message.includes('ya existe') ? 400 : 500
    }

    res.status(statusCode).json({
      error: statusCode === 400 ? 'Bad Request' : 'Internal Server Error',
      message: errorMessage,
    })
  }
}

export default createLocation
