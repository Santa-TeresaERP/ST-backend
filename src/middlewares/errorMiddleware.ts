import { Request, Response } from "express";

const errorHandler = (err: Error, _req: Request, res: Response) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!' })
  }
  
export default errorHandler;
  