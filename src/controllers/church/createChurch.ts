import { Request, Response } from 'express'
import useChurch from '@services/church/index'

const createChurch = async (req: Request, res: Response): Promise<void> => {
  try {
    const church = await useChurch.serviceCreateChurch(req.body)
    if (!church) {
      res.status(400).json({ message: 'Iglesia ya existe o datos inválidos' })
      return
    }

    res.status(201).json({ message: 'Iglesia creada correctamente', church })
  } catch (error) {
    console.error('Error al crear iglesia:', error)
    res.status(500).json({ message: 'Error al crear iglesia' })
  }
}

export default createChurch
