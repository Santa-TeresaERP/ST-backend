import SalesItem from '../models/salesItem'
import { Request, Response } from 'express'
import { HttpError } from '../errors/http'
import { salesItemsValidation } from '../schemas/salesItemsSchema'

class SalesItemsController {
  static async createSaleItem(req: Request, res: Response) {
    try {
      const validation = salesItemsValidation(req.body)
      if (!validation.success) {
        throw new HttpError('Invalid sale item data', 400)
      }

      const newSaleItem = await SalesItem.create(req.body)
      res.status(201).json({
        message: 'Sale item created successfully',
        saleItem: newSaleItem,
      })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  static async getSalesItems(_req: Request, res: Response) {
    try {
      const salesItems = await SalesItem.findAll()
      res.json(salesItems)
    } catch (error) {
      console.error('Error getting sales items:', error)
      res.status(500).json({ message: 'Error getting sales items' })
    }
  }

  static async deleteSaleItem(req: Request, res: Response) {
    try {
      const { salesId, productId } = req.params
      await SalesItem.destroy({
        where: {
          salesId: salesId,
          productId: productId,
        },
      })
      res.json({ message: 'Sale item deleted successfully' })
    } catch (error) {
      console.error('Error deleting sale item:', error)
      res.status(500).json({ message: 'Error deleting sale item' })
    }
  }

  static async updateSaleItem(req: Request, res: Response) {
    try {
      const validation = salesItemsValidation(req.body)
      if (!validation.success) {
        throw new HttpError('Invalid sale item data', 400)
      }

      const { salesId, productId } = req.params
      const [updated] = await SalesItem.update(req.body, {
        where: {
          salesId: salesId,
          productId: productId,
        },
      })

      if (!updated) {
        throw new HttpError('Sale item not found', 404)
      }

      const updatedSaleItem = await SalesItem.findOne({
        where: {
          salesId: salesId,
          productId: productId,
        },
      })
      res.json({
        message: 'Sale item updated successfully',
        saleItem: updatedSaleItem,
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

export default SalesItemsController
