import { Request, Response } from 'express'
import useChurch from '@services/church/index'

const getChurches = async (_req: Request, res: Response): Promise<void> => {
  try {
    const churches = await useChurch.serviceGetChurches()
    res.json(churches)
  } catch (error) {
    console.error('Error al obtener iglesias activas:', error)
    res.status(500).json({ message: 'Error al obtener iglesias activas' })
  }
}

export default getChurches
