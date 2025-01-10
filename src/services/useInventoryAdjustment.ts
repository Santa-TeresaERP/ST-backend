import InventoryAdjustment from '@models/inventoryAdjustment'
import Product from '@models/products'
import { InventoryAdjustmentAttributes } from '@type/inventoryAdjustment'
import { inventoryAdjustmentValidation } from 'src/schemas/inventoryAdjustmentSchema'

class useInventoryAdjustment {
  static async createAdjustment(body: InventoryAdjustmentAttributes) {
    const validation = inventoryAdjustmentValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { product_id, adjustment_type, quantity, observations } =
      validation.data

    // Verify if product exists
    const productExists = await Product.findByPk(product_id)
    if (!productExists) {
      return { error: 'El producto no existe' }
    }

    const newAdjustment = await InventoryAdjustment.create({
      product_id,
      adjustment_type,
      quantity,
      observations,
    })

    return newAdjustment
  }

  static async getAdjustments() {
    try {
      const adjustments = await InventoryAdjustment.findAll({
        include: [{ model: Product, as: 'product' }],
      })
      return adjustments
    } catch {
      return { error: 'Error al obtener los ajustes de inventario' }
    }
  }

  static async updateAdjustment(
    id: string,
    body: InventoryAdjustmentAttributes,
  ) {
    const validation = inventoryAdjustmentValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const adjustment = await InventoryAdjustment.findByPk(id)
    if (!adjustment) {
      return { error: 'El ajuste de inventario no existe' }
    }

    const { product_id, adjustment_type, quantity, observations } =
      validation.data

    // esto verifica si el producto existe si se está actualizando product_id
    if (product_id) {
      const productExists = await Product.findByPk(product_id)
      if (!productExists) {
        return { error: 'El producto no existe' }
      }
    }

    await adjustment.update({
      product_id,
      adjustment_type,
      quantity,
      observations,
    })

    return adjustment
  }

  static async deleteAdjustment(id: string) {
    const adjustment = await InventoryAdjustment.findByPk(id)
    if (!adjustment) {
      return { error: 'El ajuste de inventario no existe' }
    }

    await adjustment.destroy()
    return { message: 'Ajuste de inventario eliminado correctamente' }
  }
}

export default useInventoryAdjustment
