import Sale from '@models/sale'
import User from '@models/user'
import { Request, Response } from 'express'
import { HttpError } from '@errors/http'
import { salesAttributes } from '@type/ventas/sale'

class SalesController {
  static async createSale(req: Request, res: Response) {
    try {
      const saleData: salesAttributes = {
        userId: req.body.userId,
        total: req.body.total,
        observations: req.body.observations || null,
        createdAt: new Date(),
      }

      const sale = await Sale.create(saleData)
      if (!sale) throw new HttpError('Error creating sale', 400)

      res.status(201).json({ message: 'Sale created successfully', sale })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  static async getSales(_req: Request, res: Response) {
    try {
      const sales = await Sale.findAll({
        include: [{ model: User }],
      })
      res.json(sales)
    } catch (error) {
      console.error('Error getting sales:', error)
      res.status(500).json({ message: 'Error getting sales' })
    }
  }

  static async deleteSale(req: Request, res: Response) {
    try {
      const saleId = req.params.id
      await Sale.destroy({ where: { id: saleId } })
      res.json({ message: 'Sale deleted successfully' })
    } catch (error) {
      console.error('Error deleting sale:', error)
      res.status(500).json({ message: 'Error deleting sale' })
    }
  }

  static async updateSale(req: Request, res: Response) {
    try {
      const saleData: Partial<salesAttributes> = {
        total: req.body.total,
        observations: req.body.observations,
      }

      const [updated] = await Sale.update(saleData, {
        where: { id: req.params.id },
      })

      if (!updated) throw new HttpError('Sale not found', 404)

      res.json({ message: 'Sale updated successfully' })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}

export default SalesController
