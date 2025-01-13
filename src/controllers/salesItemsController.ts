import { Request, Response } from 'express'
import SaleItem from '@models/salesItems'
import { HttpError } from '../errors/http'
import { salesItemsValidation } from '../schemas/salesItemsSchema'

class SalesItemsController {
  static async createSaleItem(req: Request, res: Response) {
    try {
      const validation = salesItemsValidation(req.body)
      if (!validation.success) {
        throw new HttpError('Invalid sale item data', 400)
      }

      const { salesId, productId, quantity, price } = req.body
      const newSaleItem = await SaleItem.create({
        salesId,
        productId,
        quantity,
        price
      })
      
      res.status(201).json({ message: 'Sale item created successfully', saleItem: newSaleItem })
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
      const salesItems = await SaleItem.findAll()
      res.json(salesItems)
    } catch (error) {
      console.error('Error getting sales items:', error)
      res.status(500).json({ message: 'Error getting sales items' })
    }
  }

  static async getSaleItemsBySale(req: Request, res: Response) {
    try {
      const saleItems = await SaleItem.findAll({
        where: { salesId: req.params.saleId }
      })
      res.json(saleItems)
    } catch (error) {
      res.status(500).json({ error: 'Error getting sale items' })
    }
  }

  static async deleteSaleItem(req: Request, res: Response) {
    try {
      const { salesId, productId } = req.params
      await SaleItem.destroy({ 
        where: { 
          salesId: salesId,
          productId: productId
        } 
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
      const [updated] = await SaleItem.update(req.body, {
        where: { 
          salesId: salesId,
          productId: productId
        }
      })

      if (!updated) {
        throw new HttpError('Sale item not found', 404)
      }

      const updatedSaleItem = await SaleItem.findOne({
        where: {
          salesId: salesId,
          productId: productId
        }
      })
      res.json({ message: 'Sale item updated successfully', saleItem: updatedSaleItem })
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
