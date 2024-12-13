import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message })
}

export default errorHandler
