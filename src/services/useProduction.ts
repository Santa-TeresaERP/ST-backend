import production from '@models/production'
import { productionAttributes } from '@type/production'
import { productionValidation } from 'src/schemas/productionSchema'

class useProduction {
  static async createProduction(body: productionAttributes) {
    const validation = productionValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const {
      productId,
      quantityProduced,
      quantityUsed,
      productionDate,
      observation,
    } = body

    const newProduction = await production.create({
      productId,
      quantityProduced,
      quantityUsed,
      productionDate,
      observation,
    })

    return newProduction
  }

  static async getProductions() {
    const productions = await production.findAll()
    return productions
  }

  static async deleteProduction(id: string) {
    const Production = await production.findByPk(id)
    if (!Production) {
      return null
    }

    await Production.destroy()
    return { message: 'Producción eliminada correctamente' }
  }

  static async updateProduction(id: string, body: productionAttributes) {
    const validation = productionValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const Production = await production.findByPk(id)
    if (!Production) {
      return null
    }

    await Production.update(body)
    return Production
  }
}

export default useProduction
