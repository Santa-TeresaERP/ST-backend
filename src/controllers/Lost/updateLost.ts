import { Request, Response } from 'express'
import useLost from '@services/Lost'

const updateLost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedRecord = await useLost.updateLost(id, req.body)
    res.status(200).json(updatedRecord)
  } catch (error: unknown) {
    console.error('Error updating lost record:', error)
    let errorMessage = 'Unknown error occurred'
    let statusCode = 500
    if (error instanceof Error) {
      errorMessage = error.message
      statusCode = error.message.includes('no encontrado') ? 404 : 500
    }
    res.status(statusCode).json({
      error: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
      message: errorMessage,
    })
  }
}

export default updateLost
