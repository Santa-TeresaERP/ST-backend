import Return from '@models/return'
import { returnAttributes } from '@type/return'
import { productionValidation } from 'src/schemas/returnsSchema'

class useReturns {
  static async createReturn(body: returnAttributes) {
    const validation = productionValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { productId, salesId, reason, observations } = body

    const newReturn = await Return.create({
      productId,
      salesId,
      reason,
      observations,
    })

    return newReturn
  }

  static async getReturn(id: string) {
    const returnItem = await Return.findByPk(id)
    if (!returnItem) {
      return null
    }
    return returnItem
  }

  static async getAllReturns() {
    const returns = await Return.findAll()
    return returns
  }

  static async deleteReturn(id: string) {
    const returnItem = await Return.findByPk(id)
    if (!returnItem) {
      return null
    }

    await returnItem.destroy()
    return { message: 'Return deleted successfully' }
  }

  static async updateReturn(id: string, body: returnAttributes) {
    const validation = productionValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const returnItem = await Return.findByPk(id)
    if (!returnItem) {
      return null
    }

    await returnItem.update(body)
    return returnItem
  }
}

export default useReturns
