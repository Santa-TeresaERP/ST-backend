import { Request, Response } from 'express'
import useProduction from '@services/Production/index'

const updateStatusProductionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await useProduction.toggleProductionStatus(id)
    if (result.error) {
      res.status(404).json({ error: result.error })
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    console.error('Error toggling production:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export default updateStatusProductionController
