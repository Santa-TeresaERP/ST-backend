import Return from '../models/returns'
import { Request, Response } from 'express'
import { HttpError } from '../errors/http'
import { productionValidation } from '../schemas/returnsSchema'

class ReturnsController {
  static async createReturn(req: Request, res: Response) {
    try {
      const validation = productionValidation(req.body)
      if (!validation.success) {
        throw new HttpError('Invalid return data', 400)
      }

      const newReturn = await Return.create(req.body)
      res
        .status(201)
        .json({ message: 'Return created successfully', return: newReturn })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  static async getReturns(_req: Request, res: Response) {
    try {
      const returns = await Return.findAll()
      res.json(returns)
    } catch (error) {
      console.error('Error getting returns:', error)
      res.status(500).json({ message: 'Error getting returns' })
    }
  }

  static async deleteReturn(req: Request, res: Response) {
    try {
      const returnId = req.params.id
      await Return.destroy({ where: { id: returnId } })
      res.json({ message: 'Return deleted successfully' })
    } catch (error) {
      console.error('Error deleting return:', error)
      res.status(500).json({ message: 'Error deleting return' })
    }
  }

  static async updateReturn(req: Request, res: Response) {
    try {
      const validation = productionValidation(req.body)
      if (!validation.success) {
        throw new HttpError('Invalid return data', 400)
      }

      const returnId = req.params.id
      const [updated] = await Return.update(req.body, {
        where: { id: returnId },
      })

      if (!updated) {
        throw new HttpError('Return not found', 404)
      }

      const updatedReturn = await Return.findByPk(returnId)
      res.json({
        message: 'Return updated successfully',
        return: updatedReturn,
      })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}

export default ReturnsController
