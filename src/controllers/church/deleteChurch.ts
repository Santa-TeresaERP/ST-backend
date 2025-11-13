import { Request, Response } from 'express'
import useChurch from '@services/church/index'

const deleteChurch = async (req: Request, res: Response): Promise<void> => {
  try {
    const churchId = req.params.id
    await useChurch.serviceDeleteChurch(churchId)
    res.json({ message: 'Iglesia eliminada' })
  } catch (error) {
    console.error('Error al eliminar iglesia:', error)
    res.status(500).json({ message: 'Error al eliminar iglesia' })
  }
}

export default deleteChurch
