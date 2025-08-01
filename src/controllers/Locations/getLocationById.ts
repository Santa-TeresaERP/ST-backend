import { Request, Response } from 'express'
import useLocation from '@services/Locations'

const getLocationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const location = await useLocation.getLocationByID(id)
    res.status(200).json(location)
  } catch (error: unknown) {
    console.error('Error getting location by ID:', error)

    let errorMessage = 'Unknown error occurred'
    let statusCode = 500

    if (error instanceof Error) {
      errorMessage = error.message
      statusCode = error.message.includes('no encontrada') ? 404 : 500
    }

    res.status(statusCode).json({
      error: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
      message: errorMessage,
    })
  }
}

export default getLocationById
