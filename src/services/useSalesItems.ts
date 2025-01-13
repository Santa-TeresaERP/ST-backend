import SaleItem from '@models/salesItems'
import { salesItemAttributes } from '@type/salesItems'
import { salesItemsValidation } from 'src/schemas/salesItemsSchema'

class useSalesItems {
  static async createSaleItem(body: salesItemAttributes) {
    const validation = salesItemsValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { salesId, productId, quantity } = body

    const existingItem = await SaleItem.findOne({
      where: {
        salesId,
        productId
      }
    })

    if (existingItem) {
      return null
    }

    const saleItem = await SaleItem.create({
      salesId,
      productId,
      quantity
    })

    return saleItem
  }

  static async getSaleItem(salesId: string, productId: string) {
    const saleItem = await SaleItem.findOne({
      where: {
        salesId,
        productId
      }
    })

    if (!saleItem) {
      return null
    }
    return saleItem
  }

  static async deleteSaleItem(salesId: string, productId: string) {
    const saleItem = await SaleItem.findOne({
      where: {
        salesId,
        productId
      }
    })

    if (!saleItem) {
      return null
    }

    await saleItem.destroy()
    return { message: 'Item de venta eliminado correctamente' }
  }

  static async updateSaleItem(salesId: string, productId: string, body: salesItemAttributes) {
    const validation = salesItemsValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const saleItem = await SaleItem.findOne({
      where: {
        salesId,
        productId
      }
    })

    if (!saleItem) {
      return null
    }

    await saleItem.update(body)
    return saleItem
  }

  static async getAllSaleItems() {
    const saleItems = await SaleItem.findAll()
    return saleItems
  }
}

export default useSalesItems
