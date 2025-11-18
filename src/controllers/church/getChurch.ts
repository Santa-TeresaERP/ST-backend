import { Request, Response } from 'express'
import useChurch from '@services/church/index'

const getChurch = async (req: Request, res: Response): Promise<void> => {
  try {
    const churchId = req.params.id
    const church = await useChurch.serviceGetChurch(churchId)
    if (!church) {
      res.status(404).json({ message: 'Iglesia no encontrada' })
      return
    }

    res.json(church)
  } catch (error) {
    console.error('Error al obtener iglesia:', error)
    res.status(500).json({ message: 'Error al obtener iglesia' })
  }
}

export default getChurch
