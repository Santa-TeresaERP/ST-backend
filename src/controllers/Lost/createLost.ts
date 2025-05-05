import { Request, Response } from 'express'
import useLost from '@services/Lost'

const createLost = async (req: Request, res: Response) => {
  try {
    const lostRecord = await useLost.createLost(req.body)
    res.status(201).json(lostRecord)
  } catch (error: unknown) {
    console.error('Error creating lost record:', error)
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

export default createLost
