import SalesItem from '@models/salesItem'
import { salesItemsAttributes } from '@type/salesItem'
import { salesItemsValidation } from 'src/schemas/salesItemsSchema'

class useSalesItems {
  static async createSaleItem(body: salesItemsAttributes) {
    const validation = salesItemsValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { salesId, productId, quantity } = body

    // Check if item already exists
    const existingItem = await SalesItem.findOne({
      where: {
        salesId,
        productId,
      },
    })

    if (existingItem) {
      return null
    }

    const saleItem = await SalesItem.create({
      salesId,
      productId,
      quantity,
    })

    return saleItem
  }

  static async getSaleItem(salesId: string, productId: string) {
    const saleItem = await SalesItem.findOne({
      where: {
        salesId,
        productId,
      },
    })

    if (!saleItem) {
      return null
    }
    return saleItem
  }

  static async deleteSaleItem(salesId: string, productId: string) {
    const saleItem = await SalesItem.findOne({
      where: {
        salesId,
        productId,
      },
    })

    if (!saleItem) {
      return null
    }

    await saleItem.destroy()
    return { message: 'Item de venta eliminado correctamente' }
  }

  static async updateSaleItem(
    salesId: string,
    productId: string,
    body: salesItemsAttributes,
  ) {
    const validation = salesItemsValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const saleItem = await SalesItem.findOne({
      where: {
        salesId,
        productId,
      },
    })

    if (!saleItem) {
      return null
    }

    await saleItem.update(body)
    return saleItem
  }

  static async getAllSaleItems() {
    const saleItems = await SalesItem.findAll()
    return saleItems
  }
}

export default useSalesItems
