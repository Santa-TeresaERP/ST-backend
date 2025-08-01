import { Request, Response } from 'express'
import useLocation from '@services/Locations'

const getAllLocations = async (_req: Request, res: Response): Promise<void> => {
  try {
    const locations = await useLocation.getAllLocations()
    res.status(200).json({
      message: 'Lista de ubicaciones',
      data: locations,
    })
  } catch (error) {
    console.error('Error getting locations:', error)

    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getAllLocations
