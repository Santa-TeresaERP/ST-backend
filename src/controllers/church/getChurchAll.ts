import { Request, Response } from 'express'
import useChurch from '@services/church/index'

const getChurchAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const churches = await useChurch.serviceGetChurchAll()
    res.json(churches)
  } catch (error) {
    console.error('Error al obtener todas las iglesias:', error)
    res.status(500).json({ message: 'Error al obtener todas las iglesias' })
  }
}

export default getChurchAll
