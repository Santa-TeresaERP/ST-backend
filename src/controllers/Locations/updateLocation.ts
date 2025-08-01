import { Request, Response } from 'express'
import useLocation from '@services/Locations' // ✅ Import corregido

const updateLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useLocation.updateLocation(id, req.body)

    if (!result) {
      res.status(404).json({ message: 'Location not found' })
    }

    res.status(200).json(result)
  } catch (error: unknown) {
    console.error('Error updating location:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export default updateLocation
