import { Request, Response } from 'express'
import useLost from '@services/Lost'

const updateLost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useLost.updateLost(id, req.body)

    if (result.error) {
      const statusCode = result.error.includes('no encontrado') ? 404 : 500
      res.status(statusCode).json({ message: result.error })
      return
    }

    res.status(200).json(result)
    return
  } catch (error: unknown) {
    console.error('Error updating lost record:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
    return
  }
}

export default updateLost
