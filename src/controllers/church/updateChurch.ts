import { Request, Response } from 'express'
import useChurch from '@services/church/index'

const updateChurch = async (req: Request, res: Response): Promise<void> => {
  try {
    const churchId = req.params.id
    const update = await useChurch.serviceUpdateChurch(churchId, req.body)
    if (!update) {
      res.status(404).json({ message: 'Iglesia no encontrada' })
      return
    }

    if ((update as any).error) {
      res.status(400).json({ error: (update as any).error })
      return
    }

    res.json({ message: 'Iglesia actualizada', church: update })
  } catch (error) {
    console.error('Error al actualizar iglesia:', error)
    res.status(500).json({ message: 'Error al actualizar iglesia' })
  }
}

export default updateChurch
