import { salesAtributes } from '@type/sales'
import Sale from '@models/sales'
import User from '@models/user'
import { saleValidation } from 'src/schemas/salesSchema'

class useSales {
  static async createSale(body: salesAtributes) {
    const validation = saleValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { userId, total, observations } = body
    
    const user = await User.findByPk(userId)
    if (!user) {
      return null
    }

    const sale = await Sale.create({
      userId,
      total,
      observations,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return sale
  }

  static async getSale(id: string) {
    const sale = await Sale.findByPk(id, {
      include: [{ model: User }]
    })
    if (!sale) {
      return null
    }
    return sale
  }

  static async getAllSales() {
    const sales = await Sale.findAll({
      include: [{ model: User }]
    })
    return sales
  }

  static async deleteSale(id: string) {
    const sale = await Sale.findByPk(id)
    if (!sale) {
      return null
    }

    await sale.destroy()
    return { message: 'Venta eliminada correctamente' }
  }

  static async updateSale(id: string, body: Partial<salesAtributes>) {
    const sale = await Sale.findByPk(id)
    if (!sale) {
      return null
    }

    const updatedData = {
      ...sale.toJSON(),
      ...body
    }

    const validation = saleValidation(updatedData)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    await sale.update({
      ...body,
      updatedAt: new Date()
    })
    return sale
  }
}

export default useSales
