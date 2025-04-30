import { Request, Response } from 'express'
import useLost from '@services/Lost'

const deleteLost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await useLost.deleteLost(id)
    res.status(204).send()
  } catch (error: unknown) {
    console.error('Error deleting lost record:', error)
    // Manejo seguro de errores
    let statusCode = 500
    let errorMessage = 'Unknown error occurred'
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

export default deleteLost
